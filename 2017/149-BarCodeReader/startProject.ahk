xp = 0.6
yp = 0.9

Run, subl -a .
WinWait, ahk_class PX_WINDOW_CLASS
WinActivate, ahk_class PX_WINDOW_CLASS
WinMove A,, 0,0, A_ScreenWidth*xp, A_ScreenHeight

Run, http://localhost:8000/index.html
WinWait, ahk_class Chrome_WidgetWin_1
WinActivate, ahk_class Chrome_WidgetWin_1
WinMove A,, A_ScreenWidth*xp, A_ScreenHeight*(1-yp), A_ScreenWidth*(1-xp), A_ScreenHeight*yp