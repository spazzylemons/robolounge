.PHONY: all test upload

all:
	python generate.py

test: all
	cd out && python -m http.server

upload: all
	neocities push out
