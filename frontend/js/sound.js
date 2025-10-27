from pydub import AudioSegment
from pydub.generators import Sine

# GOGO!ランプ音
sound = Sine(880).to_audio_segment(duration=200).fade_in(50).fade_out(150)
sound.export("frontend/assets/sounds/gogo.mp3", format="mp3")

# レバーON音
click = Sine(1200).to_audio_segment(duration=50).fade_out(30)
click.export("frontend/assets/sounds/start.mp3", format="mp3")

# ストップ音
stop = Sine(600).to_audio_segment(duration=80).fade_out(40)
stop.export("frontend/assets/sounds/stop.mp3", format="mp3")

# ファンファーレ（ボーナス確定）
fan = (
    Sine(440).to_audio_segment(duration=200)
    + Sine(660).to_audio_segment(duration=200)
    + Sine(880).to_audio_segment(duration=400)
)
fan.export("frontend/assets/sounds/fanfare.mp3", format="mp3")

/public/js/sound.js
