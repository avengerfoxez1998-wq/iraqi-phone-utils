# iraqi-phone-utils

A lightweight, dependency-free TypeScript utility for validating, normalizing, formatting, and masking Iraqi mobile phone numbers.

The project accepts common Iraqi phone-number formats and converts them into consistent local or international forms.

## Features

- Validate Iraqi mobile phone numbers
- Normalize common local and international formats
- Convert numbers to local format
- Convert numbers to international format
- Remove common spaces and separators
- Mask phone numbers for safer display
- Written in TypeScript
- Includes automated tests
- No runtime dependencies

## Supported formats

The utility currently accepts formats such as:

```text
07712345678
7712345678
+9647712345678
9647712345678
009647712345678
+964 771 234 5678
```

## Output formats

### Local

```text
07712345678
```

### International

```text
+9647712345678
```

## Installation

The package is not yet published to npm.

To use it locally, clone the repository and install the development dependencies:

```bash
git clone https://github.com/avengerfoxez1998-wq/iraqi-phone-utils.git
cd iraqi-phone-utils
npm install
```

## Usage

```ts
import {
  formatIraqiPhoneNumber,
  isValidIraqiMobileNumber,
  maskIraqiPhoneNumber,
  normalizeIraqiPhoneNumber,
  toInternationalFormat,
  toLocalFormat,
} from "./src/index.js";

normalizeIraqiPhoneNumber("+964 771 234 5678");
// "07712345678"

isValidIraqiMobileNumber("07712345678");
// true

isValidIraqiMobileNumber("12345");
// false

toLocalFormat("+9647712345678");
// "07712345678"

toInternationalFormat("07712345678");
// "+9647712345678"

formatIraqiPhoneNumber("07712345678", "international");
// "+9647712345678"

maskIraqiPhoneNumber("07712345678");
// "0771***5678"
```

## API

### `normalizeIraqiPhoneNumber(value)`

Converts a supported Iraqi mobile number into local format.

```ts
normalizeIraqiPhoneNumber("+9647712345678");
// "07712345678"
```

Throws an error when the value is not a valid Iraqi mobile number.

### `isValidIraqiMobileNumber(value)`

Returns `true` when the supplied value is a supported Iraqi mobile number.

```ts
isValidIraqiMobileNumber("07712345678");
// true
```

### `toLocalFormat(value)`

Converts a supported number into local Iraqi format.

```ts
toLocalFormat("009647712345678");
// "07712345678"
```

### `toInternationalFormat(value)`

Converts a supported number into international format.

```ts
toInternationalFormat("07712345678");
// "+9647712345678"
```

### `formatIraqiPhoneNumber(value, format)`

Formats a number using either `local` or `international`.

```ts
formatIraqiPhoneNumber("07712345678", "international");
// "+9647712345678"
```

### `maskIraqiPhoneNumber(value)`

Masks the middle digits for safer display in interfaces and logs.

```ts
maskIraqiPhoneNumber("07712345678");
// "0771***5678"
```

## Development

Install dependencies:

```bash
npm install
```

Run the tests:

```bash
npm test
```

Build the TypeScript source:

```bash
npm run build
```

Run all checks:

```bash
npm run check
```

## Project motivation

Iraqi phone numbers are frequently entered in different local and international formats. Applications often need custom logic to validate and normalize these values before storing, comparing, or displaying them.

This project provides a small reusable utility intended to reduce duplicated implementation work in Iraqi websites and applications.

## Roadmap

Planned improvements include:

- Broader Iraqi operator-prefix validation
- Additional formatting options
- More edge-case tests
- Continuous integration
- npm publication
- Community-requested improvements

## Contributing

Contributions, bug reports, documentation improvements, and feature suggestions are welcome.

Please open an issue before submitting a major change so the proposed approach can be discussed.

## License

Released under the [MIT License](LICENSE).
