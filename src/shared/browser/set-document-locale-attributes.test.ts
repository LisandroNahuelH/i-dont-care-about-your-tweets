import { describe, expect, it } from "vitest";
import { setDocumentLocaleAttributes } from "./set-document-locale-attributes";

describe("setDocumentLocaleAttributes", () => {
  it("applies ltr metadata for English", () => {
    const result = setDocumentLocaleAttributes(document, "en");

    expect(result).toEqual({ lang: "en", dir: "ltr" });
    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.dir).toBe("ltr");
  });

  it("applies rtl metadata for Arabic", () => {
    setDocumentLocaleAttributes(document, "ar");

    expect(document.documentElement.dir).toBe("rtl");
  });
});