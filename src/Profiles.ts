import Enum from "./Enum";

// base classes
class Rows extends Enum {
  // rows defined from top to bottom of a keyboard
  public static R1 = "R1"; // default for uniform profiles
  public static R2 = "R2";
  public static R3 = "R3";
  public static R4 = "R4";
  public static R5 = "R5";
};

class Profile extends Enum {
  // alias for clarity on loops
  public static rows() {
    return this.values();
  }
}

// lazy tactics
let generateProfile = (name: string, rows: Array<string>) => {
  // class generation
  const profile = class extends Profile {};
  // dynamically set name
  Object.defineProperty(profile, 'name', { value: name, writable: false });
  // define static properties for enumeration
  for (const row of rows) {
    // force each profile's rows to point to different objects
    // comparisons must reference the profile rows directly
    // e.g. Cherry.R1 !== SA.R1
    profile[row] = new String(Rows[row]);
  }
  return profile;
};

// define profiles and their rows
const Cherry = generateProfile("Cherry", [
  Rows.R1,
  Rows.R2,
  Rows.R3,
  Rows.R4,
  Rows.R5
]);

const SA = generateProfile("SA", [
  Rows.R1,
  Rows.R2,
  Rows.R3,
  Rows.R4
]);

const XDA = generateProfile("XDA", [
  Rows.R1
]);

// aggregate profiles
class Profiles extends Enum {
  public static Cherry = Cherry;
  public static SA = SA;
}

export default Profiles;