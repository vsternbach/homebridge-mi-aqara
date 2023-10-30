class AccessoryParser {
    constructor(platform, accessoryType) {
        this.platform = platform;
        this.accessoryType = accessoryType;

        this.Accessory = platform.Accessory;
        this.PlatformAccessory = platform.PlatformAccessory;
        this.Service = platform.Service;
        this.Characteristic = platform.Characteristic;
        this.UUIDGen = platform.UUIDGen;
    }

    getAccessoryUUID(deviceSid, accessoryType) {
        var result = null;
        switch(arguments.length) {
            case 1:
                result = this.UUIDGen.generate(deviceSid + this.accessoryType);
                break;
            case 2:
                result = this.UUIDGen.generate(deviceSid + accessoryType);
                break;
        }
        return result;
    }

    getAccessoryCategory() {
        return null;
    }

    getAccessoryInformation(deviceSid) {
        return {};
    }

    getServices(jsonObj, accessoryName) {
        return [];
    }

    getCreateAccessories(jsonObj) {
        var that = this;
        var deviceSid = jsonObj['sid'];

        if(that.platform.ConfigUtil.getAccessoryDisable(deviceSid, that.accessoryType)) {
            return null;
        }

        var uuid = that.getAccessoryUUID(deviceSid);
        var accessory = that.platform.AccessoryUtil.getByUUID(uuid);
        if(null == accessory) {
            var accessoryName = that.platform.ConfigUtil.getAccessoryName(deviceSid, that.accessoryType);
            accessory = new that.PlatformAccessory(accessoryName, uuid, that.getAccessoryCategory(deviceSid));
            var accessoryInformation = that.getAccessoryInformation(deviceSid);
            accessory.getService(that.Service.AccessoryInformation)
                .setCharacteristic(that.Characteristic.Manufacturer, accessoryInformation['Manufacturer'] || "Undefined")
                .setCharacteristic(that.Characteristic.Model, accessoryInformation['Model'] || "Undefined")
                .setCharacteristic(that.Characteristic.SerialNumber, accessoryInformation['SerialNumber'] || "Undefined");
            that.getServices(jsonObj, accessoryName).forEach(function(service, index, serviceArr) {
                accessory.addService(service, accessoryName);
            });

            accessory.reachable = true;
            accessory.on('identify', function(paired, callback) {
                that.platform.log.debug(accessory.displayName + " Identify!!!");
                callback();
            });

            return accessory;
        }

        return null;
    }

    parserAccessories(jsonObj) {
    }

    getValueFrJsonObjData1(jsonObj, valueKey) {
        var dataStr = jsonObj['data'];
        if (typeof dataStr !== "string") dataStr = JSON.stringify(dataStr);
        if (undefined != dataStr && null != dataStr) {
            var dataObj = JSON.parse(dataStr);
            if(undefined != dataObj && null != dataObj) {
                var value = dataObj[valueKey];
                if(undefined != value && null != value) {
                    return value;
                }
            }
        }

        return null;
    }

    getValueFrJsonObjData2(jsonObj, valueKey) {
        var params = jsonObj['params'];
        if(undefined != params && null != params) {
            for(var i in params) {
                var value = params[i][valueKey];
                if(undefined != value && null != value) {
                    return value;
                }
            }
        }

        return null;
    }

    getValueFrJsonObjData(jsonObj, valueKey) {
        var dataStr = jsonObj['data'];
        var params = jsonObj['params'];
        if(dataStr) {
            return this.getValueFrJsonObjData1(jsonObj, valueKey);
        } else if(params) {
            return this.getValueFrJsonObjData2(jsonObj, valueKey);
        } else {
            return null;
        }
    }

    getLowBatteryByVoltage(voltage) {
        return isNaN(voltage) ? NaN : (voltage >= 2801 ? 0 : 1);
    }

    getBatteryLevelByVoltage(voltage) {
        return isNaN(voltage) ? NaN : ((voltage - 2800)/5);
    }

    getStatusLowBatteryCharacteristicValue(jsonObj, defaultValue) {
        var proto_version_prefix = this.platform.getProtoVersionPrefixByProtoVersion(this.platform.getDeviceProtoVersionBySid(jsonObj['sid']));
        if(1 == proto_version_prefix) {
            var value = this.getValueFrJsonObjData1(jsonObj, 'voltage');
        } else if(2 == proto_version_prefix) {
            var value = this.getValueFrJsonObjData2(jsonObj, 'battery_voltage');
        } else {
        }

        return value ? this.getLowBatteryByVoltage(value / 1.0) : defaultValue;
    }

    getBatteryLevelCharacteristicValue(jsonObj, defaultValue) {
        var proto_version_prefix = this.platform.getProtoVersionPrefixByProtoVersion(this.platform.getDeviceProtoVersionBySid(jsonObj['sid']));
        if(1 == proto_version_prefix) {
            var value = this.getValueFrJsonObjData1(jsonObj, 'voltage');
        } else if(2 == proto_version_prefix) {
            var value = this.getValueFrJsonObjData2(jsonObj, 'battery_voltage');
        } else {
        }

        return value ? this.getBatteryLevelByVoltage(value / 1.0) : defaultValue;
    }

    parserBatteryService(accessory, jsonObj) {
        var that = this;
        var deviceSid = jsonObj['sid'];
        var batteryService = accessory.getService(that.Service.BatteryService);
        var chargingStateCharacteristic = batteryService.getCharacteristic(that.Characteristic.ChargingState);
        var statusLowBatteryCharacteristic = batteryService.getCharacteristic(that.Characteristic.StatusLowBattery);
        var batteryLevelCharacteristic = batteryService.getCharacteristic(that.Characteristic.BatteryLevel);
        chargingStateCharacteristic.updateValue(that.Characteristic.ChargingState.NOT_CHARGEABLE);
        var statusLowBatteryValue = that.getStatusLowBatteryCharacteristicValue(jsonObj, null);
        if(null != statusLowBatteryValue) {
            statusLowBatteryCharacteristic.updateValue(statusLowBatteryValue);
        }
        var batteryLevelValue = that.getBatteryLevelCharacteristicValue(jsonObj, null);
        if(null != batteryLevelValue) {
            batteryLevelCharacteristic.updateValue(batteryLevelValue);
        }

//        if (batteryLevelCharacteristic.listeners('get').length == 0) {
//            batteryLevelCharacteristic.on("get", function(callback) {
//                var command = '{"cmd":"read", "sid":"' + deviceSid + '"}';
//                that.platform.sendReadCommand(deviceSid, command).then(result => {
//                    var statusLowBatteryValue = that.getStatusLowBatteryCharacteristicValue(jsonObj, null);
//                    if(null != statusLowBatteryValue) {
//                        statusLowBatteryCharacteristic.updateValue(statusLowBatteryValue);
//                    }
//                    var batteryLevelValue = that.getBatteryLevelCharacteristicValue(jsonObj, null);
//                    if(null != batteryLevelValue) {
//                        callback(null, batteryLevelValue);
//                    } else {
//                        callback(new Error('get value fail: ' + result));
//                    }
//                }).catch(function(err) {
//                    that.platform.log.error(err);
//                    callback(err);
//                });
//            });
//        }
    }

    callback2HB(deviceSid, characteristic, callback, err) {
        var that = this;
        if(err) {
            if(that.platform.ConfigUtil.getAccessoryNoResponse(deviceSid, that.accessoryType)) {
                const value = characteristic.value;
                setTimeout(() => {
                    characteristic.updateValue(value);
                }, 10);
                callback(null);
            } else {
                callback(err);
            }
        } else {
            callback(null);
        }
    }
}

module.exports = AccessoryParser;
