import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  centered: {
    textAlign: 'center',
    paddingTop: 30,
    fontSize: 21,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  itemsList: {
    flex: 2,
    marginTop: 2000,
    borderColor: 'green',
    borderWidth: 3,
  },
  mainView: {
    flex: 3,
    flexDirection: 'column',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    padding: 5,
    paddingTop: 30,
  },
  padding: {
    padding: 5,
  },
  paragraph: {
    color: '#7C7C7C',
    fontSize: 16,
  },
  picker: {
    flex: 5,
    paddingTop: 5,
  },
  sceneView: {
    backgroundColor: '#fff',
    flex: 1,
  },
});
