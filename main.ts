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
function vypis (text: string) {
    s += 1
    if (s > 1) {
        s = 0
        serial.writeLine("ryclost" + rychlost + ", kompas=" + kompas)
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
let s = 0
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
    let pravyMotor = 0
    let lavyMotor = 0
    cuteBot.motors(lavyMotor, pravyMotor)
    basic.pause(100)
})
