async function selectOptionByText(page, name, optionText) {
  const optionElementHandle = (
      await page.$x(`//*[@name="${name}"]/option[text()="${optionText}"]`)
  )[0];

  console.log(optionElementHandle);

  if (optionElementHandle) {
    const optionValue = await (
        await optionElementHandle.getProperty("value")
    ).jsonValue();

    return await page.select(`[name=${name}]`, optionValue);
  } else {
    throw new Error(`Option with text "${optionText}" not found for select "${name}"`);
  }
}

function containsText(page, selector, expected) {
  return page.evaluate(
    (selector, expected) => {
      return document
        .querySelector(selector)
        .innerText.toLowerCase()
        .includes(expected);
    },
    selector,
    expected
  );
}

module.exports = {
  containsText,
  selectOptionByText,
};
