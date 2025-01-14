pragma solidity ^0.5.0;

import "../helpers/openzeppelin-solidity/math/SafeMath.sol";
import "../helpers/openzeppelin-solidity/token/ERC20/IERC20.sol";
import "./BurnNMR.sol";


contract Staking is BurnNMR {

    using SafeMath for uint256;

    mapping (address => uint256) private _stake;

    event StakeAdded(address staker, address funder, uint256 amount, uint256 newStake);
    event StakeTaken(address staker, address recipient, uint256 amount, uint256 newStake);
    event StakeBurned(address staker, uint256 amount, uint256 newStake);

    function _addStake(address staker, address funder, uint256 currentStake, uint256 amountToAdd) internal {
        // require current stake amount matches expected amount
        require(currentStake == _stake[staker], "current stake incorrect");

        // require non-zero stake to add
        require(amountToAdd > 0, "no stake to add");

        // calculate new stake amount
        uint256 newStake = currentStake.add(amountToAdd);

        // set new stake to storage
        _stake[staker] = newStake;

        // transfer the stake amount
        require(IERC20(BurnNMR.getToken()).transferFrom(funder, address(this), amountToAdd), "token transfer failed");

        // emit event
        emit StakeAdded(staker, funder, amountToAdd, newStake);
    }

    function _takeStake(address staker, address recipient, uint256 currentStake, uint256 amountToTake) internal {
        // require current stake amount matches expected amount
        require(currentStake == _stake[staker], "current stake incorrect");

        // require non-zero stake to take
        require(amountToTake > 0, "no stake to take");

        // amountToTake has to be less than equal currentStake
        require(amountToTake <= currentStake, "cannot take more than currentStake");

        // calculate new stake amount
        uint256 newStake = currentStake.sub(amountToTake);

        // set new stake to storage
        _stake[staker] = newStake;

        // transfer the stake amount
        require(IERC20(BurnNMR.getToken()).transfer(recipient, amountToTake), "token transfer failed");

        // emit event
        emit StakeTaken(staker, recipient, amountToTake, newStake);
    }

    function _takeFullStake(address staker, address recipient) internal returns (uint256 stake) {
        // get stake from storage
        stake = _stake[staker];

        // take full stake
        _takeStake(staker, recipient, stake, stake);
    }

    function _burnStake(address staker, uint256 currentStake, uint256 amountToBurn) internal {
        // require current stake amount matches expected amount
        require(currentStake == _stake[staker], "current stake incorrect");

        // require non-zero stake to burn
        require(amountToBurn > 0, "no stake to burn");

        // amountToTake has to be less than equal currentStake
        require(amountToBurn <= currentStake, "cannot burn more than currentStake");

        // calculate new stake amount
        uint256 newStake = currentStake.sub(amountToBurn);

        // set new stake to storage
        _stake[staker] = newStake;

        // burn the stake amount
        BurnNMR._burn(amountToBurn);

        // emit event
        emit StakeBurned(staker, amountToBurn, newStake);
    }

    function _burnFullStake(address staker) internal returns (uint256 stake) {
        // get stake from storage
        stake = _stake[staker];

        // burn full stake
        _burnStake(staker, stake, stake);
    }

    // view functions

    function getStake(address staker) public view returns (uint256 stake) {
        stake = _stake[staker];
    }

}
