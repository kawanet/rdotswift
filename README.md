# rdotswift

res/values/strings.xml to R.swift

## SYNOPSIS

```sh
rdotswift app/src/main/res/values/strings.xml > R.swift

rdotswift app/src/main/res/values/*.xml --output=R.swift

rdotswift app/src/production/res/values/*.xml --extension --if='!DEBUG' --output=R+production.swift

rdotswift app/src/develop/res/values/*.xml --extension --if=DEBUG --exclude='*_android' --output=R+develop.swift
```

## OPTIONS

`--class=R` - class name. default: `R`

`--exclude='*_android'` - key names to exclude. wildcard available

`--extension` - extension only without `final class R {}` declaration

`--if=DEBUG` - wrap with `#if DEBUG` ... `#endif` conditional compilation statement

`--output=R.swift` - output file name. default: `-` (STDOUT)

`-` - input XML from STDIN

## INSTALL

```sh
brew install node # for Mac users

npm install -g rdotswift
```

## JavaScript API

```js
var R = {
  color: {
    colorPrimary: "#3F51B5"
  },
  dimen: {
    activity_horizontal_margin: "16dp"
  },
  string: {
    app_name: "MyApp"
  }
};

var swift = rdotswift.format(R);

fs.writeFileSync("R.swift", swift);
```

## REPOSITORY

- [https://github.com/kawanet/rdotswift](https://github.com/kawanet/rdotswift)

## LICENSE

The MIT License (MIT)

Copyright (c) 2016 Yusuke Kawasaki

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
