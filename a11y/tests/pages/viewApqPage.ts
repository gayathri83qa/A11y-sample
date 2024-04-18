import { BASE_URL } from "../environment";
import { login, runAxeAndAssert } from "../helpers";
import { tryDeleteItemWithReference, insertItemByReference } from "../../../cucumber/utils/dbUtil";

fixture `a11y: View APQ`
  .page `${BASE_URL}/assessment-plan-query`;

test("The list page should pass accessibility checks", async t => {
  const apqRef = "A11Y000001";
  await login(t);
  await tryDeleteItemWithReference(apqRef);
  const id = await insertItemByReference(apqRef, {});
  await t.navigateTo(`${BASE_URL}/assessment-plan-query/${id}`);
  await runAxeAndAssert(t, "view");
});