
interface ColorOptions {
  r: number;
  g: number;
  b: number;
}

interface ColorJSON {
  r: number;
  g: number;
  b: number;
}

class Color {
  public _r: number = 0;
  public _g: number = 0;
  public _b: number = 0;

  public constructor(options: Color | ColorOptions) {
    if (arguments.length <= 0) return;
    if (
      typeof options !== "object" ||
      (!(options instanceof Color) &&
      options.constructor.name !== "Object")
    ) throw new TypeError();
    const { r, g, b } = options;
    if (r == null) throw new TypeError();
    if (g == null) throw new TypeError();
    if (b == null) throw new TypeError();
    this.r = r;
    this.g = g;
    this.b = b;
  }

  // property getters and setters
  public get r(): number {
    const { _r } = this;
    return _r;
  }

  public set r(r: number) {
    if (typeof r !== "number") throw new TypeError();
    if (r < 0 || r > 255) throw new RangeError();
    this._r = r;
  }

  public get g(): number {
    const { _g } = this;
    return _g;
  }

  public set g(g: number) {
    if (typeof g !== "number") throw new TypeError();
    if (g < 0 || g > 255) throw new RangeError();
    this._g = g;
  }

  public get b(): number {
    const { _b } = this;
    return _b;
  }

  public set b(b: number) {
    if (typeof b !== "number") throw new TypeError();
    if (b < 0 || b > 255) throw new RangeError();
    this._b = b;
  }

  // computed property getters and setters
  public get hex(): number {
    const { _r, _g, _b } = this;
    let hex = 0;
    for (let val of [_r, _g, _b]) {
      hex = (hex << 8) + val;
    }
    return hex;
  }

  public set hex(hex: number) {
    if (typeof hex !== "number") throw new TypeError();
    if (!Number.isInteger(hex)) throw new TypeError();
    if (hex < 0 || hex > 16777215) throw new RangeError();
    this.r = hex >> 16 & 0xFF;
    this.g = hex >> 8 & 0xFF;
    this.b = hex >> 0 & 0xFF;
  }

  public get cssRgb(): string {
    const { _r, _g, _b } = this;
    return `rgb(${_r},${_g},${_b})`;
  }

  public set cssRgb(cssRgb: string) {
    if (typeof cssRgb !== "string") throw new TypeError();
    const regex = /rgb?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)/;
    if (!regex.test(cssRgb)) throw new TypeError();
    const [_, r, g, b] = cssRgb.match(regex).map(str => Number.parseInt(str));
    this.r = r;
    this.g = g;
    this.b = b;
  }


  public get cssHex(): string {
    const { hex } = this;
    const hexString = hex.toString(16);
    const padding = "0".repeat(6 - hexString.length);
    return `#${padding}${hexString.toUpperCase()}`;
  }

  public set cssHex(cssHex: string) {
    if (typeof cssHex !== "string") throw new TypeError();
    // original regex, 1 or 2 groups of 3
    // if (!/#([[:xdigit:]]{3}){1,2}\b/.test(cssHex)) throw new TypeError();
    // only support 6 digit cssHex
    const regex = /^#([a-fA-F0-9]{3}){1,2}$/;
    if (!regex.test(cssHex)) throw new TypeError();
    const hex = Number.parseInt(cssHex.substring(1), 16);
    this.hex = hex;
  }

  public toJSON(): ColorJSON {
    const { _r, _g, _b } = this;
    return {
      r: _r,
      g: _g,
      b: _b
    };
  }
}

export default Color;