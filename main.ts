function nastav_servo_rychlosti (nova_rychlost: number) {
    rychlost = nova_rychlost
    pins.servoWritePin(AnalogPin.P2, Math.map(rychlost, -100, 100, 0, 180))
}
input.onButtonPressed(Button.A, function () {
    servo_otacania += 10
    pins.servoWritePin(AnalogPin.P1, servo_otacania)
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
    vypis_servo_otacania()
})
function vypis_servo_otacania () {
    aktualny_cas = input.runningTime()
    if (aktualny_cas - stary_cas > 1000) {
        stary_cas = aktualny_cas
        serial.writeLine("servo otacania" + servo_otacania)
    }
}
function vypis () {
    aktualny_cas = input.runningTime()
    if (aktualny_cas - stary_cas > 1000) {
        stary_cas = aktualny_cas
        serial.writeLine("rychlost" + rychlost + ", kompas zmena=" + kompas_zmena)
    }
}
input.onButtonPressed(Button.B, function () {
    servo_otacania += -10
    pins.servoWritePin(AnalogPin.P1, servo_otacania)
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
    vypis_servo_otacania()
})
radio.onReceivedValue(function (name, value) {
    if (name == "v") {
        nastav_servo_rychlosti(value)
    }
    if (name == "k") {
        nastav_servo_otacania(value)
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    nastav_servo_rychlosti(0)
})
function nastav_servo_otacania (kompas_ovladac: number) {
    if (rychlost != 0) {
        if (kalibrovat_kompas == 0) {
            kalibrovat_kompas = 1
            kompas_auto = input.compassHeading()
            kompas_kalibracia = kompas_ovladac - kompas_auto
        } else {
            kompas_auto = input.compassHeading()
            kompas_zmena = kompas_ovladac - kompas_auto - kompas_kalibracia
            if (kompas_zmena > 180) {
                kompas_zmena += -360
            }
            if (kompas_zmena < -180) {
                kompas_zmena += 360
            }
            if (kompas_zmena < -45) {
                pins.servoWritePin(AnalogPin.P1, 150)
            } else if (kompas_zmena > 45) {
                pins.servoWritePin(AnalogPin.P1, 85)
            } else {
                pins.servoWritePin(AnalogPin.P1, Math.map(kompas_zmena, -45, 45, 150, 85))
            }
        }
    }
}
let kompas_kalibracia = 0
let kompas_auto = 0
let kompas_zmena = 0
let aktualny_cas = 0
let kalibrovat_kompas = 0
let servo_otacania = 0
let rychlost = 0
let stary_cas = 0
serial.redirectToUSB()
radio.setGroup(1)
basic.showLeds(`
    . . . . .
    . # # # .
    . # # # .
    . # # # .
    . . . . .
    `)
stary_cas = 0
rychlost = 0
soundExpression.happy.play()
servo_otacania = 90
kalibrovat_kompas = 0
