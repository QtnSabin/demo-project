import { GetTotalNumber } from './GetTotalNumber';

describe('Additionne les nombres dans une structure JSON', () => {
  let getTotalNumber: GetTotalNumber;

  beforeEach(() => {
    getTotalNumber = new GetTotalNumber();
  });

  test('Doit renvoyer la valeur d\'un seul nombre', () => {
    const data = { a: 2 };
    expect(getTotalNumber.execute(data)).toEqual(2);
  });

  test.each([
    [],
    'a',
    null,
    undefined,
    {},
  ])('Doit renvoyer 0 pour la valeur "%s"', (value) => {
    const data = { a: value };
    expect(getTotalNumber.execute(data)).toEqual(0);
  });

  test('Doit additionner les nombres dans une structure imbriqué', () => {
    const data = { a: 1, b: { c: 2 } };
    expect(getTotalNumber.execute(data)).toEqual(3);
  });

  test('Doit additionner les nombres dans un tableau', () => {
    const data = { a: [1, 2] };
    expect(getTotalNumber.execute(data)).toEqual(3);
  });

  test('Doit additionner les nombres dans une structures complexe', () => {
    const data = {
      a: 5,
      b: {
        c: 3,
        d: {
          e: 8,
          f: 'hello world !',
        },
      },
      g: [1, 2, { h: 4 }],
    };
    expect(getTotalNumber.execute(data)).toEqual(23);
  });
});
