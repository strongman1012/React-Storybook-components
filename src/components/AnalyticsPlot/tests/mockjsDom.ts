//Nessecary because the plotly component has this function in it, so this helps the jsdom environment be set up so that it doesnt crash
//(the function just wont do anything, which doesnt seem to be a problem)

Object.defineProperty(URL, 'createObjectURL', {
    writable: true,
    value: jest.fn()
  })