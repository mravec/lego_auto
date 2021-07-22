function nastav_servo_rychlosti (nova_rychlost: number) {
    rychlost = nova_rychlost
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
        serial.writeLine("rychlost" + rychlost + ", kompas=" + kompas)
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
        kompas = value
    }
})
input.onLogoEvent(TouchButtonEvent.Touched, function () {
    nastav_servo_rychlosti(0)
})
let kompas = 0
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
    cuteBot.motors(0, -65)
    basic.pause(100)
})
