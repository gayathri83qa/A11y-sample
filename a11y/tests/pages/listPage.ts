import { BASE_URL } from "../environment";
import { login, runAxeAndAssert } from "../helpers";

fixture `a11y: APQ List`
  .page `${BASE_URL}/assessment-plan-query`;

test("The list page should pass accessibility checks", async t => {
  await login(t);
  await runAxeAndAssert(t, "list");
});