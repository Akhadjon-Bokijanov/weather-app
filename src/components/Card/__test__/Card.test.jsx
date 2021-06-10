import { render, cleanup } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import Card from "../Card";
import { sample } from '../../../App';
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";

afterEach(cleanup);

it("renders without issues", ()=>{
    const div = document.createElement('div');
    ReactDOM.render(<Card />, div);
});

it("render with styles", ()=>{
    let data = sample[0];
    const { getByTestId } = render(<Card { ...data } />)

    expect(getByTestId("card-test-id")).toHaveStyle("cursor: pointer");
})

it("snapshot test", ()=>{
    const s = renderer.create(<Card { ...sample[1] } />).toJSON();

    expect(s).toMatchSnapshot();
});