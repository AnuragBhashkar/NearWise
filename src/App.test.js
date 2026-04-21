import { calculateScore } from "./utils/scoringLogic";

/**
 * Unit tests for the NearWise scoring algorithm (scoringLogic.js).
 *
 * These tests verify that mood-based score adjustments behave correctly —
 * i.e., the right type of place rises to the top for each mood.
 */

const BASE_PLACE = {
  rating: 4.2,
  distance: 1.5,
  openNow: true,
  priceLevel: 2,
  type: "cafe",
};

describe("calculateScore — base behaviour", () => {
  test("returns a number", () => {
    expect(typeof calculateScore(BASE_PLACE, "work")).toBe("number");
  });

  test("returns a positive score for a reasonable place", () => {
    const score = calculateScore(BASE_PLACE, "work");
    expect(score).toBeGreaterThan(0);
  });

  test("closer places score higher (all else equal)", () => {
    const close  = calculateScore({ ...BASE_PLACE, distance: 0.5 }, "work");
    const far    = calculateScore({ ...BASE_PLACE, distance: 4.0 }, "work");
    expect(close).toBeGreaterThan(far);
  });

  test("higher-rated places score higher (all else equal)", () => {
    const good = calculateScore({ ...BASE_PLACE, rating: 4.8 }, "work");
    const poor = calculateScore({ ...BASE_PLACE, rating: 3.0 }, "work");
    expect(good).toBeGreaterThan(poor);
  });
});

describe("calculateScore — work mood", () => {
  test("cafes score higher than restaurants in work mood", () => {
    const cafe       = calculateScore({ ...BASE_PLACE, type: "cafe" },       "work");
    const restaurant = calculateScore({ ...BASE_PLACE, type: "restaurant" }, "work");
    expect(cafe).toBeGreaterThan(restaurant);
  });

  test("open places score higher than closed in work mood", () => {
    const open   = calculateScore({ ...BASE_PLACE, openNow: true  }, "work");
    const closed = calculateScore({ ...BASE_PLACE, openNow: false }, "work");
    expect(open).toBeGreaterThan(closed);
  });
});

describe("calculateScore — date mood", () => {
  test("higher-rated restaurants score better in date mood", () => {
    const highRated = calculateScore({ ...BASE_PLACE, rating: 4.9, type: "restaurant" }, "date");
    const lowRated  = calculateScore({ ...BASE_PLACE, rating: 3.2, type: "restaurant" }, "date");
    expect(highRated).toBeGreaterThan(lowRated);
  });
});

describe("calculateScore — quick mood", () => {
  test("closed places receive a heavy penalty in quick mood", () => {
    const open   = calculateScore({ ...BASE_PLACE, openNow: true  }, "quick");
    const closed = calculateScore({ ...BASE_PLACE, openNow: false }, "quick");
    expect(open).toBeGreaterThan(closed + 4); // penalty is −5
  });

  test("fast_food scores higher than cafe in quick mood", () => {
    const fastFood = calculateScore({ ...BASE_PLACE, type: "fast_food" }, "quick");
    const cafe     = calculateScore({ ...BASE_PLACE, type: "cafe"      }, "quick");
    expect(fastFood).toBeGreaterThan(cafe);
  });

  test("proximity dominates in quick mood", () => {
    const close = calculateScore({ ...BASE_PLACE, distance: 0.3, rating: 3.5 }, "quick");
    const far   = calculateScore({ ...BASE_PLACE, distance: 4.5, rating: 5.0 }, "quick");
    expect(close).toBeGreaterThan(far);
  });
});

describe("calculateScore — budget mood", () => {
  test("cheaper places score higher in budget mood", () => {
    const cheap     = calculateScore({ ...BASE_PLACE, priceLevel: 1 }, "budget");
    const expensive = calculateScore({ ...BASE_PLACE, priceLevel: 3 }, "budget");
    expect(cheap).toBeGreaterThan(expensive);
  });
});
