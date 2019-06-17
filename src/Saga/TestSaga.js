export default function* testFunction(action) {
  try {
    yield console.log('saga function called', action);
  } catch (err) {
    console.log(err);
  }
}
