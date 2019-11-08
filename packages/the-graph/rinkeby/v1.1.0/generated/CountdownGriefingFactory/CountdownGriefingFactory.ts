// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  EthereumCall,
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt,
  CallResult
} from "@graphprotocol/graph-ts";

export class InstanceCreated extends EthereumEvent {
  get params(): InstanceCreated__Params {
    return new InstanceCreated__Params(this);
  }
}

export class InstanceCreated__Params {
  _event: InstanceCreated;

  constructor(event: InstanceCreated) {
    this._event = event;
  }

  get instance(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get callData(): Bytes {
    return this._event.parameters[2].value.toBytes();
  }
}

export class CountdownGriefingFactory extends SmartContract {
  static bind(address: Address): CountdownGriefingFactory {
    return new CountdownGriefingFactory("CountdownGriefingFactory", address);
  }

  getInstanceType(): Bytes {
    let result = super.call("getInstanceType", []);

    return result[0].toBytes();
  }

  try_getInstanceType(): CallResult<Bytes> {
    let result = super.tryCall("getInstanceType", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBytes());
  }

  getTemplate(): Address {
    let result = super.call("getTemplate", []);

    return result[0].toAddress();
  }

  try_getTemplate(): CallResult<Address> {
    let result = super.tryCall("getTemplate", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  getInitSelector(): Bytes {
    let result = super.call("getInitSelector", []);

    return result[0].toBytes();
  }

  try_getInitSelector(): CallResult<Bytes> {
    let result = super.tryCall("getInitSelector", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBytes());
  }

  createSalty(callData: Bytes, salt: Bytes): Address {
    let result = super.call("createSalty", [
      EthereumValue.fromBytes(callData),
      EthereumValue.fromFixedBytes(salt)
    ]);

    return result[0].toAddress();
  }

  try_createSalty(callData: Bytes, salt: Bytes): CallResult<Address> {
    let result = super.tryCall("createSalty", [
      EthereumValue.fromBytes(callData),
      EthereumValue.fromFixedBytes(salt)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  getInstanceCreator(instance: Address): Address {
    let result = super.call("getInstanceCreator", [
      EthereumValue.fromAddress(instance)
    ]);

    return result[0].toAddress();
  }

  try_getInstanceCreator(instance: Address): CallResult<Address> {
    let result = super.tryCall("getInstanceCreator", [
      EthereumValue.fromAddress(instance)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  getNextInstance(callData: Bytes): Address {
    let result = super.call("getNextInstance", [
      EthereumValue.fromBytes(callData)
    ]);

    return result[0].toAddress();
  }

  try_getNextInstance(callData: Bytes): CallResult<Address> {
    let result = super.tryCall("getNextInstance", [
      EthereumValue.fromBytes(callData)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  getInstanceRegistry(): Address {
    let result = super.call("getInstanceRegistry", []);

    return result[0].toAddress();
  }

  try_getInstanceRegistry(): CallResult<Address> {
    let result = super.tryCall("getInstanceRegistry", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  getInstanceCount(): BigInt {
    let result = super.call("getInstanceCount", []);

    return result[0].toBigInt();
  }

  try_getInstanceCount(): CallResult<BigInt> {
    let result = super.tryCall("getInstanceCount", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toBigInt());
  }

  getPaginatedInstances(startIndex: BigInt, endIndex: BigInt): Array<Address> {
    let result = super.call("getPaginatedInstances", [
      EthereumValue.fromUnsignedBigInt(startIndex),
      EthereumValue.fromUnsignedBigInt(endIndex)
    ]);

    return result[0].toAddressArray();
  }

  try_getPaginatedInstances(
    startIndex: BigInt,
    endIndex: BigInt
  ): CallResult<Array<Address>> {
    let result = super.tryCall("getPaginatedInstances", [
      EthereumValue.fromUnsignedBigInt(startIndex),
      EthereumValue.fromUnsignedBigInt(endIndex)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddressArray());
  }

  create(callData: Bytes): Address {
    let result = super.call("create", [EthereumValue.fromBytes(callData)]);

    return result[0].toAddress();
  }

  try_create(callData: Bytes): CallResult<Address> {
    let result = super.tryCall("create", [EthereumValue.fromBytes(callData)]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  getInstances(): Array<Address> {
    let result = super.call("getInstances", []);

    return result[0].toAddressArray();
  }

  try_getInstances(): CallResult<Array<Address>> {
    let result = super.tryCall("getInstances", []);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddressArray());
  }

  getInstance(index: BigInt): Address {
    let result = super.call("getInstance", [
      EthereumValue.fromUnsignedBigInt(index)
    ]);

    return result[0].toAddress();
  }

  try_getInstance(index: BigInt): CallResult<Address> {
    let result = super.tryCall("getInstance", [
      EthereumValue.fromUnsignedBigInt(index)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }

  getSaltyInstance(callData: Bytes, salt: Bytes): Address {
    let result = super.call("getSaltyInstance", [
      EthereumValue.fromBytes(callData),
      EthereumValue.fromFixedBytes(salt)
    ]);

    return result[0].toAddress();
  }

  try_getSaltyInstance(callData: Bytes, salt: Bytes): CallResult<Address> {
    let result = super.tryCall("getSaltyInstance", [
      EthereumValue.fromBytes(callData),
      EthereumValue.fromFixedBytes(salt)
    ]);
    if (result.reverted) {
      return new CallResult();
    }
    let value = result.value;
    return CallResult.fromValue(value[0].toAddress());
  }
}

export class CreateSaltyCall extends EthereumCall {
  get inputs(): CreateSaltyCall__Inputs {
    return new CreateSaltyCall__Inputs(this);
  }

  get outputs(): CreateSaltyCall__Outputs {
    return new CreateSaltyCall__Outputs(this);
  }
}

export class CreateSaltyCall__Inputs {
  _call: CreateSaltyCall;

  constructor(call: CreateSaltyCall) {
    this._call = call;
  }

  get callData(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }

  get salt(): Bytes {
    return this._call.inputValues[1].value.toBytes();
  }
}

export class CreateSaltyCall__Outputs {
  _call: CreateSaltyCall;

  constructor(call: CreateSaltyCall) {
    this._call = call;
  }

  get instance(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class CreateCall extends EthereumCall {
  get inputs(): CreateCall__Inputs {
    return new CreateCall__Inputs(this);
  }

  get outputs(): CreateCall__Outputs {
    return new CreateCall__Outputs(this);
  }
}

export class CreateCall__Inputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get callData(): Bytes {
    return this._call.inputValues[0].value.toBytes();
  }
}

export class CreateCall__Outputs {
  _call: CreateCall;

  constructor(call: CreateCall) {
    this._call = call;
  }

  get instance(): Address {
    return this._call.outputValues[0].value.toAddress();
  }
}

export class ConstructorCall extends EthereumCall {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get instanceRegistry(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get templateContract(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}
