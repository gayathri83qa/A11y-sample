import { BASE_URL } from "../environment";
import { login, runAxeAndAssert } from "../helpers";

fixture `a11y: New APQ`
  .page `${BASE_URL}/assessment-plan-query/new`;

test("The list page should pass accessibility checks", async t => {
  await login(t);
  await runAxeAndAssert(t, "new");
});