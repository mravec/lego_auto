input.onButtonPressed(Button.A, function () {
    cuteBot.motors(0, 0)
})
radio.onReceivedValue(function (name, value) {
    if (name == "x") {
        xHodnota = value
    }
    if (name == "y") {
        yHodnota = value
    }
})
let prekazka = 0
let xHodnota = 0
let yHodnota = 0
radio.setGroup(1)
cuteBot.colorLight(cuteBot.RGBLights.RGB_L, 0x0000ff)
cuteBot.colorLight(cuteBot.RGBLights.RGB_R, 0xffff00)
basic.showLeds(`
    . # . # .
    # . . . #
    # . . . #
    # . . . #
    . # # # .
    `)
for (let index = 0; index < 4; index++) {
    music.playMelody("A B B A A B B A ", 1400)
}
yHodnota = 0
xHodnota = 0
basic.forever(function () {
    prekazka = cuteBot.ultrasonic(cuteBot.SonarUnit.Centimeters)
    if (prekazka < 30) {
        cuteBot.motors(-65, -65)
        basic.pause(2000)
        cuteBot.motors(0, -65)
        basic.pause(200)
        cuteBot.motors(0, -65)
        basic.pause(1000)
    } else {
        cuteBot.motors(xHodnota, yHodnota)
    }
    basic.pause(100)
})
