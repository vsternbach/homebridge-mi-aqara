# homebridge-mi-aqara-ng

This is a fork of a homebridge plugin for Xiaomi Aqara platform with some bug fixes, improvements and additional features.

Additional Features and Improvements:
* Add Gateway Ringtone Switch
* Enable Button Long Press

Bug Fixes:
* data parsing bug

**Note: According to aqara local network protocol use UDP port 9898, please notice the relevant configuration of firewall.**   
   
**Note: 0.5.x update to 0.6.x must be [clear register accessories](#clear-register-accessories清除注册配件) and update [configuration](#configuration配置说明) file content.**   
   
**Note: About AcPartner, This project only provides gateway functionality. If you want the use air conditioning function, please refer to the project for [homebridge-mi-acPartner](https://github.com/LASER-Yi/homebridge-mi-acPartner).**   
   
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/Gateway.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/ContactSensor.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/MotionSensor.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/Button.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/TemperatureAndHumiditySensor.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/SingleSwitch.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/DuplexSwitch.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/SingleSwitchLN.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/DuplexSwitchLN.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/SingleButton86.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/DuplexButton86.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/PlugBase.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/PlugBase86.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/MagicSquare.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/SmokeDetector.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/NatgasDetector.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/ElectricCurtain.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/ContactSensor2.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/MotionSensor2.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/Button2.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/TemperatureAndHumiditySensor2.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/WaterDetector.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/Lock.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/AcPartner.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/Button3.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/DuplexButton862.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/Vibration.jpg)
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/ElectricCurtainBattery.jpg)

## Supported Devices
||Device Name|Protocol Model ValueModel|
|:-:|:-|:-|
|1|Gateway|gateway<br>gateway.v3|
|2|ContactSensor|magnet<br>sensor_magnet|
|3|MotionSensor|motion|
|4|Button|switch<br>sensor_switch|
|5|TemperatureAndHumiditySensor|sensor_ht|
|6|SingleSwitch|ctrl_neutral1|
|7|DuplexSwitch|ctrl_neutral2|
|8|SingleSwitchLN|ctrl_ln1<br>ctrl_ln1.aq1|
|9|DuplexSwitchLN|ctrl_ln2<br>ctrl_ln2.aq1|
|10|SingleButton86|86sw1<br>sensor_86sw1.aq1<br>sensor_86sw1|
|11|DuplexButton86|86sw2<br>sensor_86sw2.aq1<br>sensor_86sw2|
|12|PlugBase|plug|
|13|PlugBase86|86plug<br>ctrl_86plug<br>ctrl_86plug.aq1|
|14|MagicSquare|cube<br>sensor_cube<br>sensor_cube.aqgl01|
|15|SmokeDetector|smoke<br>sensor_smoke|
|16|NatgasDetector|natgas<br>sensor_natgas|
|17|ElectricCurtain|curtain|
|18|ContactSensor2|sensor_magnet.aq2|
|19|MotionSensor2|sensor_motion.aq2|
|20|Button2|sensor_switch.aq2<br>remote.b1acn01|
|21|TemperatureAndHumiditySensor2|weather.v1<br>weather|
|22|WaterDetector|sensor_wleak.aq1|
|23|Lock|lock.aq1|
|24|AcPartner|acpartner.v3|
|25|Button3|sensor_switch.aq3|
|26|DuplexButton862|remote.b286acn01|
|27|VibrationSensor|vibration|
|28|ElectricCurtainBattery|curtain.hagl04|


## Pre-Requirements
1. Make sure your IOS version is IOS11 or later.   
2. Make sure you have gateway v2 or acpartner v3. gateway v1 has limited space so can't support this feature.   
3. Update gateway firmware to **1.4.1_155.0143(gateway v2)**, **1.4.1_148.019(acpartner v3)** or later.    
   
## Installation
1. Install HomeBridge, please follow its [README](https://github.com/nfarina/homebridge/blob/master/README.md).   
HomeBridge：[README](https://github.com/nfarina/homebridge/blob/master/README.md)。   
If you are using Raspberry Pi, please read [Running-HomeBridge-on-a-Raspberry-Pi](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi).   
2. Make sure you can see HomeBridge in your iOS devices, if not, please go back to step 1.   
3. Download homebridge-mi-aqara to your HomeBridge path or installation through NPM:   
```
npm install -g homebridge-mi-aqara
```
   

## Configuration
||Name|Required|Value Type|Description|Value Example|
|:-:|:-|:-|:-|:-|:-|
|1|platform|True|String|It must be 'MiAqaraPlatform'|'MiAqaraPlatform'|
|2|[gateways](#gateways-configuration网关配置)|True|Object|set gateway information.|{ "6409802da3b3": "02i44k56zrgg578b" }|
|3|[bindAddress](#bindaddress-configuration监听地址配置)|False|String|specified network.|"10.0.1.1"|
|4|[sendWhoisCmdInterval](#sendWhoisCmdInterval-configuration自动发送whois命令间隔时间配置)|False|Integer|set send whois cmd interval.|3600000|
|5|[autoRemoveAccessoryInterval](#autoRemoveAccessoryInterval-configuration自动删除配件检测间隔时间配置)|False|Integer|set auto remove accessory interval.|3600000|
|6|[defaultValue](#defaultvalue-configuration默认值配置)|False|Object|set device default value.||
|7|[manage](#manage-configuration设备web管理界面配置)|False|Object|open manage and manage configs.|{ "port": 11128, "password": "107927710" }|
|8|[mqtt](#mqtt-configurationmqtt配置)|False|Object|open mqtt and mqtt configs.|{ "username": "mqtt", "password": "107927710" }|
   
For more information about config, Please refer to file `sampleConfig.json`.   
   
### gateways configuration
Open aqara gateway's settings, enable [local network protocol](https://github.com/louisZL/lumi-gateway-local-api).   
Please follow the steps in this thread: http://wiki.yinhh.com/Wiki.jsp?page=Homebridge-mi-aqara or http://bbs.xiaomi.cn/t-13198850. It's in Chinese, so you might need a translator to read it.  

On iPhone:   
* Open the app   
* Select the gateway   
* Press the top right `(…)` Settings button   
* Select `About`   
* Tap five times in the blank area to reveal the hidden menu items   
* Below the version numbers, choose the first: `LAN Communication Protocol`   
* Toggle the `LAN Communication Protocol` switch to on   
* Take note of the alphanumeric code beside `Password`   
* Press `OK`   
* Go back to the previous menu (About) and select the next option: `Gateway Information`   
* Take note of the MAC address at `mac=`   
   
To control the devices, put gateway's MAC address (**lower case without colon**) and password (**keep original and case sensitive**) to ~/.homebridge/config.json.    
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b"
        }
    }]
}
```
If you have more than one gateway, fill them in right order, like below:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        }
    }]
}
```
Here is a way to search for gateways instead of multicast, because of some friends do not respond to information from gateway in their network environment.   
That is to say, we can config the IP address of the gateway to replace search gateway by multicast.   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": {
                "password": "02i44k56zrgg578b",
                "ip": "10.3.3.1"
            },
            "f0b4299a5b2b": {
                "password": "2F92E7DA90C66B86",
                "ip": "10.3.3.2"
            },
            "f0b4299a77dd": {
                "password": "syu3oasva3uqd5qd",
                "ip": "10.3.3.3"
            }
        }
    }]
}
```
It can also be mixed config, but without full configuration of ip, multicast packets will still be sent to search for other gateways which do not config ip.   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": {
                "password": "2F92E7DA90C66B86",
                "ip": "10.3.3.2"
            },
            "f0b4299a77dd": {
                "password": "syu3oasva3uqd5qd",
                "ip": "10.3.3.3"
            }
        }
    }]
}
```

### bindAddress configuration
If your device(which running homebridge) has multiple network, please add the bindAddress configuration item to decide to listen which network, like below:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "bindAddress": "10.0.1.1",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        }
    }]
}
```

### sendWhoisCmdInterval configuration
If this configuration item is not configured, it will send whois command every hour by default.   
If your network has some problems, and you can't receive the heartbeat packet, you can use send whois command to replace the heartbeat function. If you use it in this way, you can set the value of the configuration item to 5 seconds, that is 5000. example:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "bindAddress": "10.0.1.1",
        "sendWhoisCmdInterval": 5000,
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        }
    }]
}
```

### autoRemoveAccessoryInterval configuration
If you want the plugin to help you automatically delete devices that have not received heartbeat for a long time, you can configure this item. The value is how often to detect. If you don't need to automatically delete accessories, you can not configure this configuration.   
**note: long time is defined as: no heartbeat received in more than 7 days.**    
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "bindAddress": "10.0.1.1",
        "autoRemoveAccessoryInterval": 3600000,
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        }
    }]
}
```

### defaultValue configuration
If you want to specify the default value, such as specify the name of the accessory, hide the accessory, any other configs. You can add a defaultValue mapping table to your config.json.   
The config supported are as follows:   

| |Name|Value Type|Description|Default Value|Recommended Value|Value Example|
|:----:|:-|:-|:-|:-|:-|:-|
|  1   |[name](#defaultvalue-name-configuration默认值-名称配置)|String|set accessory name.|DeviceAccessoryType_device SID last four bits||"living room temperature"|
|  2   |[serviceType](#defaultvalue-servicetype-configuration默认值-类型配置)|String|set accessory type for Switch or Lightbulb.<br>Currently only supported: SingleSwitch, DuplexSwitch, SingleSwitchLN, DuplexSwitchLN.|"Switch"|"Switch"|"Lightbulb"|
|  3   |[disable](#defaultvalue-disable-configuration默认值-隐藏配件配置)|Boolean|disable accessory|false|the accessories that do not need to be set to true, such as virtual press.|true|
|  4   |[syncValue](#defaultvalue-syncvalue-configuration默认值-同步值配置)|Boolean|accessory will synchronization value when homebridge call the get function, if it's true.|false|fasle|false|
|  5   |[ignoreWriteResult](#defaultvalue-ignorewriteresult-configuration默认值-忽略控制反馈配置)|Boolean|if set to true, the result of control is not detected.|true|If your network is awful, it's recommended to be set true.|false|
|  6   |[disableNoResponse](#defaultvalue-disablenoresponse-configuration默认值-隐藏未响应状态配置)|Boolean|use jump back the last value to replace show NoResponse, you can set it true.|false|false|true|
|  7   |defaultValue|Number/String|use to set default value for accessory, currently used only by Gateway_Ringtone to set the [ringtone_id](https://www.home-assistant.io/integrations/xiaomi_aqara/)|false|false|

The rules are as follows:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "device1 sid": {
                "DeviceAccessoryType1": {
                    "config1": "config1 value"
                }
            },
            "device2 sid": {
                "DeviceAccessoryType1": {
                    "config1": "config1 value"
                    "config2": "config2 value"
                },
                "DeviceAccessoryType2": {
                    "config1": "config1 value"
                }
            }
        }
    }]
}
```
examples:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "158d0001000001": {
                "ContactSensor_ContactSensor": {
                    "name": "entrance door"
                }
            },
            "158d0001000002": {
                "MotionSensor2_MotionSensor": {
                    "name": "study room motion sensor"
                },
                "MotionSensor2_LightSensor": {
                    "name": "study room light sensor"
                }
            }
        }
    }]
}
```
   
The rules of A DeviceAccessoryType:   
```
DeviceName_HomeBridgeAccessoryType(_ExtraMessage)   
```
detail:   

||Device Name|DeviceAccessoryType|
|:-:|:-|:-|
|1|Gateway|Gateway_Lightbulb<br>Gateway_LightSensor<br>Gateway_Switch_JoinPermission|
|2|ContactSensor|ContactSensor_ContactSensor|
|3|MotionSensor|MotionSensor_MotionSensor|
|4|Button|Button_StatelessProgrammableSwitch<br>Button_Switch_VirtualSinglePress<br>Button_Switch_VirtualDoublePress|
|5|TemperatureAndHumiditySensor|TemperatureAndHumiditySensor_TemperatureSensor<br>TemperatureAndHumiditySensor_HumiditySensor|
|6|SingleSwitch|SingleSwitch_Switch|
|7|DuplexSwitch|DuplexSwitch_Switch_Left<br>DuplexSwitch_Switch_Right|
|8|SingleSwitchLN|SingleSwitchLN_Switch|
|9|DuplexSwitchLN|DuplexSwitchLN_Switch_Left<br>DuplexSwitchLN_Switch_Right|
|10|SingleButton86|SingleButton86_StatelessProgrammableSwitch<br>SingleButton86_Switch_VirtualSinglePress|
|11|DuplexButton86|DuplexButton86_StatelessProgrammableSwitch_Left<br>DuplexButton86_Switch_VirtualSinglePress_Left<br>DuplexButton86_StatelessProgrammableSwitch_Right<br>DuplexButton86_Switch_VirtualSinglePress_Right<br>DuplexButton86_StatelessProgrammableSwitch_Both<br>DuplexButton86_Switch_VirtualSinglePress_Both|
|12|PlugBase|PlugBase_Outlet|
|13|PlugBase86|PlugBase86_Outlet|
|14|MagicSquare|MagicSquare_StatelessProgrammableSwitch_Flip90<br>MagicSquare_StatelessProgrammableSwitch_Flip180<br>MagicSquare_StatelessProgrammableSwitch_Move<br>MagicSquare_StatelessProgrammableSwitch_TapTwice<br>MagicSquare_StatelessProgrammableSwitch_ShakeAir<br>MagicSquare_StatelessProgrammableSwitch_Rotate<br>MagicSquare_Switch_VirtualFlip90<br>MagicSquare_Switch_VirtualFlip180<br>MagicSquare_Switch_VirtualMove<br>MagicSquare_Switch_VirtualTapTwice<br>MagicSquare_Switch_VirtualShakeAir|
|15|SmokeDetector|SmokeDetector_SmokeSensor|
|16|NatgasDetector|NatgasDetector_SmokeSensor|
|17|ElectricCurtain|ElectricCurtain_WindowCovering|
|18|ContactSensor2|ContactSensor2_ContactSensor|
|19|MotionSensor2|MotionSensor2_MotionSensor<br>MotionSensor2_LightSensor|
|20|Button2|Button2_StatelessProgrammableSwitch<br>Button2_Switch_VirtualSinglePress<br>Button2_Switch_VirtualDoublePress|
|21|TemperatureAndHumiditySensor2|TemperatureAndHumiditySensor2_TemperatureSensor<br>TemperatureAndHumiditySensor2_HumiditySensor|
|22|WaterDetector|WaterDetector_LeakSensor|
|23|Lock|Lock_MotionSensor<br>Lock_MotionSensor_{UserID}|
|24|AcPartner|AcPartner_LightSensor<br>AcPartner_Switch_JoinPermission|
|25|Button3|Button3_StatelessProgrammableSwitch<br>Button3_StatelessProgrammableSwitch_Shake<br>Button3_Switch_VirtualSinglePress<br>Button3_Switch_VirtualDoublePress<br>Button3_Switch_VirtualShare|
|26|DuplexButton862|DuplexButton862_StatelessProgrammableSwitch_Left<br>DuplexButton862_Switch_VirtualSinglePress_Left<br>DuplexButton862_Switch_VirtualDoublePress_Left<br>DuplexButton862_StatelessProgrammableSwitch_Right<br>DuplexButton862_Switch_VirtualSinglePress_Right<br>DuplexButton862_Switch_VirtualDoublePress_Right<br>DuplexButton862_StatelessProgrammableSwitch_Both<br>DuplexButton862_Switch_VirtualSinglePress_Both|
|27|VibrationSensor|VibrationSensor_MotionSensor_Vibrate<br>VibrationSensor_MotionSensor_Tilt<br>VibrationSensor_MotionSensor_FreeFall|
|28|ElectricCurtainBattery|ElectricCurtainBattery_WindowCovering|
   
About Global:   
Some similar configurations and repeated multiple copies are boring things. So I provided a global writing method.   
The following two methods of writing are equivalent:   
```
....
"158d0001000008": {
    "DuplexSwitch_Switch_Left": {
        "name": "master bedroom room light",
        "serviceType": "Lightbulb"
    },
    "DuplexSwitch_Switch_Right": {
        "name": "study room light",
        "serviceType": "Lightbulb"
    }
}
....
```
```
....
"158d0001000008": {
    "Global": {
        "serviceType": "Lightbulb"
    },
    "DuplexSwitch_Switch_Left": {
        "name": "master bedroom room light"
    },
    "DuplexSwitch_Switch_Right": {
        "name": "study room light"
    }
}
....
```
In the same way, the following two kinds of writing are equivalent:   
```
....
"158d0001000003": {
    "Button_StatelessProgrammableSwitch": {
        "name": "living room button"
    },
    "Button_Switch_VirtualSinglePress": {
        "name": "living room button virtual single press",
        "disable": true
    },
    "Button_Switch_VirtualDoublePress": {
        "name": "living room button virtual double press",
        "disable": true
    }
}
....
```
```
....
"158d0001000003": {
    "Global": {
        "disable": true 
    },
    "Button_StatelessProgrammableSwitch": {
        "name": "living room button",
        "disable": false
    },
    "Button_Switch_VirtualSinglePress": {
        "name": "living room button virtual single press"
    },
    "Button_Switch_VirtualDoublePress": {
        "name": "living room button virtual double press"
    }
}
....
```
It also provides a higher level of way, the following three kinds of writing are equivalent:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "158d0001000007": {
                "SingleSwitch_Switch": {
                    "name": "living room light",
                    "ignoreWriteResult": true
                }
            },
            "158d0001000008": {
                "DuplexSwitch_Switch_Left": {
                    "name": "master bedroom room light",
                    "ignoreWriteResult": true
                },
                "DuplexSwitch_Switch_Right": {
                    "name": "study room light",
                    "ignoreWriteResult": true
                }
            }
        }
    }]
}
```
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "158d0001000007": {
                "SingleSwitch_Switch": {
                    "name": "living room light",
                    "ignoreWriteResult": true
                }
            },
            "158d0001000008": {
                "Global": {
                    "ignoreWriteResult": true
                },
                "DuplexSwitch_Switch_Left": {
                    "name": "master bedroom room light"
                },
                "DuplexSwitch_Switch_Right": {
                    "name": "study room light"
                }
            }
        }
    }]
}
```
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "Global": {
                "ignoreWriteResult": true
            },
            "158d0001000007": {
                "SingleSwitch_Switch": {
                    "name": "living room light"
                }
            },
            "158d0001000008": {
                "DuplexSwitch_Switch_Left": {
                    "name": "master bedroom room light"
                },
                "DuplexSwitch_Switch_Right": {
                    "name": "study room light"
                }
            }
        }
    }]
}
```

### defaultValue name configuration(
If you want to specify the default name of the device, add a mapping table to your config.json like this:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "158d0001000001": {
                "ContactSensor_ContactSensor": {
                    "name": "entrance door"
                }
            },
            "158d0001000002": {
                "MotionSensor2_MotionSensor": {
                    "name": "study room motion sensor"
                },
                "MotionSensor2_LightSensor": {
                    "name": "study room light sensor"
                }
            },
            "158d0001000004": {
                "TemperatureAndHumiditySensor_TemperatureSensor": {
                    "name": "living room temperature"
                },
                "TemperatureAndHumiditySensor_HumiditySensor": {
                    "name": "living room humidity"
                }
            }
        }
    }]
}
```

### defaultValue serviceType configuration
If you like to use Light Bulb type for Light Switch to make grandma Siri happy, like snOOrz, you can set the following in the config:   
Currently only supported: SingleSwitch, DuplexSwitch, SingleSwitchLN, DuplexSwitchLN.   
**If you changed serviceType config, Please [clear register accessories](#clear-register-accessories).**   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "158d0001000007": {
                "SingleSwitch_Switch": {
                    "name": "living room light",
                    "serviceType": "Lightbulb"
                }
            },
            "158d0001000008": {
                "Global": {
                    "serviceType": "Lightbulb"
                },
                "DuplexSwitch_Switch_Left": {
                    "name": "master bedroom room light"
                },
                "DuplexSwitch_Switch_Right": {
                    "name": "study room light"
                }
            },
            "158d10010000001": {
                "DuplexSwitch_Switch_Left": {
                    "name": "master bedroom room light",
                    "serviceType": "Lightbulb"
                },
                "DuplexSwitch_Switch_Right": {
                    "name": "study room light"
                }
            }
        }
    }]
}
```

### defaultValue disable configuration
If you want to disable accessories, you can add disable attribute to config.   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "158d0001000007": {
                "SingleSwitch_Switch": {
                    "name": "living room light",
                    "serviceType": "Lightbulb"
                }
            },
            "158d0001000008": {
                "DuplexSwitch_Switch_Left": {
                    "name": "master bedroom room light",
                    "serviceType": "Lightbulb",
                    "disable": false
                },
                "DuplexSwitch_Switch_Right": {
                    "name": "study room light",
                    "serviceType": "Lightbulb",
                    "disable": true
                }
            },
            "158d0001000004": {
                "TemperatureAndHumiditySensor_TemperatureSensor": {
                    "name": "living room temperature"
                },
                "TemperatureAndHumiditySensor_HumiditySensor": {
                    "name": "living room humidity",
                    "disable": true
                }
            },
            "158d0001000012": {
                "Global": {
                    "disable": true
                }
            },
            "158d0001000015": {
                "Global": {
                    "disable": true
                },
                "MagicSquare_StatelessProgrammableSwitch_Flip90": {
                    "name": "study room magic square flip90",
                    "disable": false
                }
            }
        }
    }]
}
```

### defaultValue syncValue configuration
If you want to accessory value exact, you can set syncValue is true.   
when syncValue is true, accessory will synchronization value when homebridge call the get function. At the same time, it's going to waste more time.   
when syncValue is false, accessory will use the device last reported value. It's going to respond quickly.   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "158d0001000007": {
                "SingleSwitch_Switch": {
                    "name": "living room light",
                    "serviceType": "Lightbulb",
                    "syncValue": true
                }
            }
        }
    }]
}
```

### defaultValue ignoreWriteResult configuration
If you control device always timeout, but in fact it's already working.   
you can set ignoreWriteResult is true.   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "Global": {
                "ignoreWriteResult": true
            },
            "158d0001000007": {
                "SingleSwitch_Switch": {
                    "name": "living room light",
                    "serviceType": "Lightbulb",
                    "syncValue": true
                }
            }
        }
    }]
}
```
   
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/syncValue.png)
   
### defaultValue disableNoResponse configuration
If you don't like "No Response", you can set disableNoResponse is true.   
When the device is no response and disableNoResponse is true, the accessory value will auto jump back to before the control.   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "Global": {
                "disableNoResponse": true
            },
            "158d0001000007": {
                "SingleSwitch_Switch": {
                    "name": "living room light",
                    "serviceType": "Lightbulb",
                    "syncValue": true
                }
            }
        }
    }]
}
```

### defaultValue other configuration
If you want to use Aqara lock, you need add some configuration like this:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "LockDeviceID": {
                "Lock_MotionSensor": {
                    "name": "door"
                },
                "Lock_MotionSensor_{User1ID}": {
                    "name": "User1Name"
                },
                "Lock_MotionSensor_{User2ID}": {
                    "name": "User2Name"
                }
            }
        }
    }]
}
```
`{UserID}` is user identification from lock.   
The value can get from `Aqara Lock Plugin` in `MIHOME` APP. The user ID contains the ID type.   
The integer value obtained by dividing the user ID by 65536 is the ID type. The ID type value is:   
1. fingerprint   
2. password   
3. proximity card   
4. check-in password   
Example:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        },
        "defaultValue": {
            "158d0001dd0289": {
                "Lock_MotionSensor": {
                    "name": "door"
                },
                "Lock_MotionSensor_65536": {
                    "name": "Administrator"
                },
                "Lock_MotionSensor_65537": {
                    "name": "Finger"
                },
                "Lock_MotionSensor_196608": {
                    "name": "Card"
                }
            }
        }
    }]
}
```  
   
### manage configuration
Before version 0.7.x, the addition and deletion of accessories are automatic. The rules are as follows:   
**find new accessories every one hour, delete accessories which did not receive heartbeat over 7 days.**   
Obviously, this is not easy to use. So version 0.7.0 added http web manage(if you do not set manage item, then http web manage is close.). config add these:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "manage": {
            "port": 11128,
            "password": "107927710"
        },
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        }
    }]
}
```
Config items description:   

||Name|Required|Value Type|Description|Recommended Value|Value Example|
|:-:|:-|:-|:-|:-|:-|:-|
|1|port|True|Integer|set manage web port.|11128|11128|
|2|password|True|String|set manage web password.|"107927710"|"107927710"|
    
![](https://raw.githubusercontent.com/YinHangCode/homebridge-mi-aqara/master/images/httpWebManage.png)
    
### mqtt configuration
config add these:   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "mqtt": {
        },
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        }
    }]
}
```
Or   
```
{
    "platforms": [{
        "platform": "MiAqaraPlatform",
        "mqtt": {
            "server": "10.0.1.1",
            "username": "mqtt",
            "password": "mqtt"
        },
        "gateways": {
            "6409802da3b3": "02i44k56zrgg578b",
            "f0b4299a5b2b": "2F92E7DA90C66B86",
            "f0b4299a77dd": "syu3oasva3uqd5qd"
        }
    }]
}
```
Config items description:   

||Name|Required|Value Type|Description|Default Value|Value Example|
|:-:|:-|:-|:-|:-|:-|:-|
|1|server|False|String|set mqtt server ip.|"127.0.0.1"|"10.0.1.1"|
|2|username|False|String|set mqtt username.|"mqtt"|"mqtt"|
|3|password|False|String|set mqtt password.|"mqtt"|"mqtt"|
    
plugin will send these topic:   
1. `/homebridge-mi-aqara`: all message.
2. `/homebridge-mi-aqara/{cmd}`: all message after `{cmd}` filter.
3. `/homebridge-mi-aqara/{sid}`: all message after `{sid}` filter.
4. `/homebridge-mi-aqara/{sid}/{cmd}`: all message after `{sid}` and `{cmd}` filter.   
   
`{cmd}` is iam/get_id_list_ack/discovery_rsp/write_ack/write_rsp/read_ack/read_rsp/report.   
`{sid}` is device's sid.   
   
plugin will accept these topic:   
1. `/homebridge-mi-aqara/write`: write device. 
about write key, send the `${key}` is okay, this plugin will automatically calculate the key value, for example:   
`{"cmd": "write", "model": "ctrl_neutral2", "sid": "158d00014a1bcd", "params": [{"channel_0": "off"}], "key": "${key}"}`
    
## Some explanation
Button/Button2 StatelessProgrammableSwitch support SinglePress, DoublePress, LongPress.   
SingleButton86/DuplexButton86(Left, Right, Both) StatelessProgrammableSwitch only support SinglePress.   
MagicSquare(Flip90, Flip180, Move, TapTwice, ShakeAir, Rotate) StatelessProgrammableSwitch only support SinglePress.   
   
## Run it
```
homebridge
```

run in debug mode   
```
homebridge -D
```
   
## Clear register accessories
```
cd ~/.homebridge/accessories/   
mv cachedAccessories cachedAccessories_\`date '+%Y%m%d_%H%M%S'\`.bak   
echo [] > cachedAccessories   
```
## Original Credits
Thanks for
[nfarina](https://github.com/nfarina)(the author of [homebridge](https://github.com/nfarina/homebridge)),
[snOOrz](https://github.com/snOOrz)(the author of [homebridge-aqara](https://github.com/snOOrz/homebridge-aqara)),
[licuhui](https://github.com/licuhui),
[攀旺智能](https://pwzn.taobao.com/),
[magaHH](https://github.com/magaHH),
[isundaylee](https://github.com/isundaylee),
[ileler](https://github.com/ileler),
[myriky](https://github.com/myriky),
[Runc2333](https://github.com/Runc2333),
[yangliu](https://github.com/yangliu),
[wonderfullay](https://github.com/wonderfullay),
[BrianHenryIE](https://github.com/BrianHenryIE),
all other developer and testers.   
[nfarina](https://github.com/nfarina)([homebridge](https://github.com/nfarina/homebridge)),
[snOOrz](https://github.com/snOOrz)([homebridge-aqara](https://github.com/snOOrz/homebridge-aqara)),
[licuhui](https://github.com/licuhui),
[攀旺智能](https://pwzn.taobao.com/),
[magaHH](https://github.com/magaHH),
[isundaylee](https://github.com/isundaylee),
[ileler](https://github.com/ileler),
[myriky](https://github.com/myriky),
[Runc2333](https://github.com/Runc2333),
[yangliu](https://github.com/yangliu),
[wonderfullay](https://github.com/wonderfullay),
[BrianHenryIE](https://github.com/BrianHenryIE).
