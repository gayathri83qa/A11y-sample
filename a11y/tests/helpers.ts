import { runAxe } from "@testcafe-community/axe";
import axe from "axe-core";
import { createHtmlReport } from "axe-html-reporter";
import { Selector } from "testcafe";

const logViolationLine = (v: axe.Result) => 
  `${v.id} - ${v.description}\r\nImpact: ${v.impact}\r\nHelp: ${v.helpUrl}\r\nTags: ${v.tags.join(", ")}`;

export const formatViolations = (violations: axe.Result[]) => {
  return violations.reduce((acc, curr, ix) => `${acc}\r\nERROR #${ix}: ${logViolationLine(curr)}`, "Summary of aXe errors\r\n");
}

export const login = async (t: TestController) => {
  await t.click(Selector(`[name=user]`).parent(0));
  const admin = Selector("li").withAttribute("data-value", "ofqual.itadmin@ofqualprojects.onmicrosoft.com");
  await t.click(admin);
  await t.wait(5000);
}

export const runAxeAndAssert = async (t: TestController, pageName: string) => {
  const { error, results } = await runAxe();
  await t.expect(error).eql(null, `Axe check failed with an error: ${error}`);
  createHtmlReport({
    results,
    options: {
      outputDir: "a11y/reports",
      reportFileName: `a11y-portal-apq__${pageName}.html`,
      projectKey: "@ofqual/portal-apq",
    }
  });
  await t.expect(results.violations.length).eql(0, formatViolations(results.violations));
}