export function* testFunction(action) {
  try {
    yield console.log("saga function called");
  } catch (err) {
    console.log(err);
  }
}
