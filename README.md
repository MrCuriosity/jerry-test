## Intensity Segments

### Overall

This is a simple implementation of Intensity Segment problem by Javascript(Typescript). Unit tests covered.

### API

#add

```javascript
const segments = new IntensitySegments();

segments.add(10, 30, 1);
expect(segments.toString()).toEqual('"[[10,1],[30,0]]"');

segments.add(20, 40, 1);
expect(segments.toString()).toEqual('"[[10,1],[20,2],[30,1],[40,0]]"');

segments.add(10, 40, -1);
expect(segments.toString()).toEqual('"[[20,1],[30,0]]"');

segments.add(10, 40, -1);
expect(segments.toString()).toEqual('"[[10,-1],[20,0],[30,-1],[40,0]]"');
```

#set

```javascript
const segments = new IntensitySegments();

segments.add(10, 30, 1);
expect(segments.toString()).toEqual('"[[10,1],[30,0]]"');

segments.add(20, 40, 1);
expect(segments.toString()).toEqual('"[[10,1],[20,2],[30,1],[40,0]]"');

segments.set(10, 40, 1);
expect(segments.toString()).toEqual('"[[10,1],[40,0]]"');
```

Feel free to check more details and use cases in [test cases](./__tests__/intensity-segments.spec.js)

## Run test in local

### Dependencies

Node.js >= v24.1.0

npm >= 11.3.0

```shell
npm install
```

```shell
npm run test
```
