input.onButtonPressed(Button.A, function () {
    cuteBot.motors(0, 0)
})
function vypis () {
    serial.writeLine("name=" + "" + " value=" + value + " time=" + input.runningTime())
}
radio.onReceivedValue(function (name, value) {
    if (name == "lv") {
        lavyMotor = value
    }
    if (name == "pv") {
        pravyMotor = value
    }
})
let prekazka = 0
let pravyMotor = 0
let lavyMotor = 0
serial.redirectToUSB()
serial.writeLine("Start")
radio.setGroup(1)
basic.showLeds(`
    . . . . .
    . # # # .
    . # # # .
    . # # # .
    . . . . .
    `)
lavyMotor = 0
pravyMotor = 0
basic.forever(function () {
    if (false) {
        prekazka = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters)
        if (prekazka < 30 && (lavyMotor != 0 && pravyMotor != 0)) {
            cuteBot.motors(-10, -10)
            basic.pause(500)
            cuteBot.motors(0, 0)
            basic.pause(200)
        } else {
        	
        }
    }
    cuteBot.motors(lavyMotor, pravyMotor)
    basic.pause(100)
})
