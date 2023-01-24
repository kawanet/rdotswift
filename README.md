# rdotswift

[![Node.js CI](https://github.com/kawanet/rdotswift/workflows/Node.js%20CI/badge.svg?branch=master)](https://github.com/kawanet/rdotswift/actions/)
[![npm version](https://badge.fury.io/js/rdotswift.svg)](https://badge.fury.io/js/rdotswift)

iOS Swift code generator from Android app's `res/values/strings.xml`

## GENERATED SWIFT SAMPLE

```swift
extension R.bool {
    /// true
    static let screen_small = true
}

extension R.color {
    /// #3F51B5
    static let colorPrimary = UIColor(red: 0.247, green: 0.318, blue:0.71, alpha: 1)
}

extension R.dimen {
    /// 16dp
    static let activity_horizontal_margin: CGFloat = 16
}

extension R.integer {
    /// 75
    static let max_speed = 75
}

extension R.string {
    /// MyApp
    static let app_name = "MyApp"
}
```

## SYNOPSIS

```sh
rdotswift app/src/main/res/values/strings.xml > R.swift

rdotswift app/src/main/res/values/*.xml --output=R.swift

rdotswift app/src/production/res/values/*.xml --extension --if='!DEBUG' --output=R+production.swift

rdotswift app/src/develop/res/values/*.xml --extension --if=DEBUG --exclude='*_android' --output=R+develop.swift
```

## CLI OPTIONS

- `--appkit` - import AppKit for macOS application. default: import UIKit
- `--class=R` - class name. default: `R`
- `--exclude='*_android'` - key names to exclude. wildcard available
- `--extension` - extension only without `final class R {}` declaration
- `--if=DEBUG` - wrap with `#if DEBUG` ... `#endif` conditional compilation statement
- `--merge` - merge all resources. default: declare each resource respectively
- `--comment=right` - include right-side comment within the same line on XML
- `-` - input XML from STDIN

## INSTALL

```sh
npm install -g rdotswift
```

## JavaScript API

```js
const R = {
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

const swift = rdotswift.format(R);

fs.writeFileSync("R.swift", swift);
```

## SEE ALSO

- [https://github.com/kawanet/rdotswift](https://github.com/kawanet/rdotswift)
- [https://github.com/kawanet/rdotjson](https://github.com/kawanet/rdotjson)
- [https://developer.android.com/guide/topics/resources/string-resource](https://developer.android.com/guide/topics/resources/string-resource)

## LICENSE

The MIT License (MIT)

Copyright (c) 2016-2023 Yusuke Kawasaki

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
