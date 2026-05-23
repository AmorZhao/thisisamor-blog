Using [Fusion pixel font](https://github.com/TakWolf/fusion-pixel-font) (MIT licensed). 

## Build instructions

From root folder, run `pip install -r requirements.txt`

Check if the tools folder is in current Python environment ``python -c "import sys; print(sys.path)"

If current root path is not listed, add manually using `$env:PYTHONPATH = (Get-Location).Path`

Build everything using `python tools\build.py`

