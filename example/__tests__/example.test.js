import React from 'react';
import Area from '../src/chart-types/Area';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Area></Area>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});