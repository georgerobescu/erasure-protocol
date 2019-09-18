pragma solidity ^0.5.0;

import "../helpers/openzeppelin-solidity/math/SafeMath.sol";
import "../helpers/openzeppelin-solidity/token/ERC20/IERC20.sol";
import "../modules/Countdown.sol";
import "../modules/Griefing.sol";
import "../modules/EventMetadata.sol";
import "../modules/Operated.sol";
import "../modules/Template.sol";

/* Immediately engage with specific buyer
 * - Stake can be increased at any time.
 * - Counterparty can greif the staker at predefined ratio.
 *
 * NOTE:
 * - This top level contract should only perform access control and state transitions
 *
 */
contract SimpleGriefing is Griefing, EventMetadata, Operated, Template {

    using SafeMath for uint256;

    Data private _data;
    struct Data {
        address staker;
        address counterparty;
    }

    event Initialized(address token, address operator, address staker, address counterparty, uint256 ratio, Griefing.RatioType ratioType, bytes metadata);

    function initialize(
        address token,
        address operator,
        address staker,
        address counterparty,
        uint256 ratio,
        Griefing.RatioType ratioType,
        bytes memory metadata
    ) public initializeTemplate() {
        // set storage values
        _data.staker = staker;
        _data.counterparty = counterparty;

        // set operator
        if (operator != address(0)) {
            Operated._setOperator(operator);
            Operated._activateOperator();
        }

        // set token used for staking
        Staking._setToken(token);

        // set griefing ratio
        Griefing._setRatio(staker, ratio, ratioType);

        // set metadata
        if (metadata.length != 0) {
            EventMetadata._setMetadata(metadata);
        }

        // log initialization params
        emit Initialized(token, operator, staker, counterparty, ratio, ratioType, metadata);
    }

    // state functions

    function setMetadata(bytes memory metadata) public {
        // restrict access
        require(isStaker(msg.sender) || Operated.isActiveOperator(msg.sender), "only staker or active operator");

        // update metadata
        EventMetadata._setMetadata(metadata);
    }

    function increaseStake(uint256 currentStake, uint256 amountToAdd) public {
        // restrict access
        require(isStaker(msg.sender) || Operated.isActiveOperator(msg.sender), "only staker or active operator");

        // add stake
        Staking._addStake(_data.staker, msg.sender, currentStake, amountToAdd);
    }

    function reward(uint256 currentStake, uint256 amountToAdd) public {
        // restrict access
        require(isCounterparty(msg.sender) || Operated.isActiveOperator(msg.sender), "only counterparty or active operator");

        // add stake
        Staking._addStake(_data.staker, msg.sender, currentStake, amountToAdd);
    }

    function punish(uint256 currentStake, uint256 punishment, bytes memory message) public returns (uint256 cost) {
        // restrict access
        require(isCounterparty(msg.sender) || Operated.isActiveOperator(msg.sender), "only counterparty or active operator");

        // execute griefing
        cost = Griefing._grief(msg.sender, _data.staker, currentStake, punishment, message);
    }

    function releaseStake(uint256 currentStake, uint256 amountToRelease) public {
        // restrict access
        require(isCounterparty(msg.sender) || Operated.isActiveOperator(msg.sender), "only counterparty or active operator");

        // release stake back to the staker
        Staking._takeStake(_data.staker, _data.staker, currentStake, amountToRelease);
    }

    function transferOperator(address operator) public {
        // restrict access
        require(Operated.isActiveOperator(msg.sender), "only active operator");

        // transfer operator
        Operated._transferOperator(operator);
    }

    function renounceOperator() public {
        // restrict access
        require(Operated.isActiveOperator(msg.sender), "only active operator");

        // transfer operator
        Operated._renounceOperator();
    }

    // view functions

    function isStaker(address caller) public view returns (bool validity) {
        validity = (caller == _data.staker);
    }

    function isCounterparty(address caller) public view returns (bool validity) {
        validity = (caller == _data.counterparty);
    }
}
