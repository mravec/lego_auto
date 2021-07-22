function nastav_servo_rychlosti (nova_rychlost: number) {
    rychlost = nova_rychlost
    pins.servoWritePin(AnalogPin.P2, Math.map(rychlost, -100, 100, 0, 180))
}
input.onButtonPressed(Button.A, function () {
    nastav_servo_rychlosti(100)
    soundExpression.spring.play()
    basic.showLeds(`
        . . # . .
        . # # # .
        # . # . #
        . . # . .
        . . # . .
        `)
})
function vypis () {
    aktualny_cas = input.runningTime()
    if (aktualny_cas - stary_cas > 1000) {
        stary_cas = aktualny_cas
        serial.writeLine("rychlost" + rychlost + ", kompas=" + "")
    }
}
input.onButtonPressed(Button.B, function () {
    nastav_servo_rychlosti(-100)
    soundExpression.slide.play()
    basic.showLeds(`
        . . # . .
        . . # . .
        # . # . #
        . # # # .
        . . # . .
        `)
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
    kompas_auto = input.compassHeading()
    pins.servoWritePin(AnalogPin.P1, 0)
}
let kompas_auto = 0
let stary_cas = 0
let aktualny_cas = 0
let rychlost = 0
serial.redirectToUSB()
radio.setGroup(1)
basic.showLeds(`
    . . . . .
    . # # # .
    . # # # .
    . # # # .
    . . . . .
    `)
rychlost = 0
soundExpression.happy.play()
basic.forever(function () {
    basic.pause(100)
})
