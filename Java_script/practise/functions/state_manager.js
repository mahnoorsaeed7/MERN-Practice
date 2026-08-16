// Build a function that creates an isolated character state manager. It should expose operations to read the current state and update it without allowing callers to directly mutate the internal state.

const stateManager = (character, update) => {
const copyagent = {...character}
    return function isolatedManager (){
        copyagent.map()
    }
}