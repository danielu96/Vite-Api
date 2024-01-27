import { test, expect,describe,it} from 'vitest';
import { render,screen } from '@testing-library/react';
import UserList from './MockData.jsx';
import ApiList from '../src/Components/ApiList.jsx';
import tasks from '../server/tasks.json'
import '@testing-library/jest-dom';

 test('Verify user count', () => {
  const userList = UserList;
  expect(userList.length).toBe(4);
});

test('Verify first user', () => {
  const userList = UserList;
  const firstUser = userList[0];
  expect(firstUser.name).toBe('Daniel');
  expect(firstUser.lastName).toBe('Kartkowski');
  expect(firstUser.location).toBe('Wasabi');
  expect(firstUser.email).toBe('daniel@wp.pl');
});
test('Find Daniel in UserList', () => {
  const userList = UserList;
  const daniel = userList.find(user => user.name === 'Daniel');
  expect(daniel).toBeTruthy();
});

test('Verify Daniel properties', () => {
  const userList = UserList;
  const daniel = userList.find(user => user.name === 'Daniel');
  expect(daniel.id).toBeTruthy();
  expect(daniel.password).toBe('123');
  expect(daniel.lastName).toBe('Kartkowski');
  expect(daniel.location).toBe('Wasabi');
  expect(daniel.email).toBe('daniel@wp.pl');
});
test('Verify task count', () => {
  const tasks = [
    { id: 'I0b-ENEAXbOSqW-E9S2zz', title: 'first task', author: 'NOAN', isDone: false },
    { id: 'hvBD6B_wfeNz2tUENiWQe', title: 'third task', author: 'NOLAN', isDone: true },
    { id: 'b035W-cJYnwS3akrP5QQK', title: 'random task', author: 'NATAN', isDone: true },
    { id: '7yZ2RaWptYep1HTpeM7K1', title: 'test', author: 'DAN', email: 'test@test.com', isDone: false },
    { id: 'Q0JWHELX-V3lEd-W8QWNS', title: 'test 2', author: 'daniwel', email: 'test@test.com', isDone: true },
    { id: 'ZSPC1AuxAMzjIUG3lgzA5', title: 'test3', author: 'danik', email: 'test@test.com', isDone: true },
  ];
  expect(tasks.length).toBe(6);
});

test('Verify task property values', () => {
  const task = tasks[0];
  expect(task.id).toBe('I0b-ENEAXbOSqW-E9S2zz');
  expect(task.title).toBe('first task');
  expect(task.author).toBe('NOAN');
  expect(task.isDone).toBe(false);
});

test('Verify email for task 2', () => {
  const task2 = tasks[3];
  expect(task2.author).toBe('DAN');
  expect(task2.email).toBe('test@test.com');
});

test('Verify task status', () => {
  const task3 = tasks[4];
  expect(task3.title).toBe('test 2');
  expect(task3.author).toBe('daniwel');
  expect(task3.email).toBe('test@test.com');
  expect(task3.isDone).toBe(true);
});

test('Verify task author with "dan"', () => {
  const tasksWithDan = tasks.filter((task) => task.author.includes('dan'));
  expect(tasksWithDan.length).toBe(2);
  expect(tasksWithDan[0].author).toBe('daniwel');
  expect(tasksWithDan[1].author).toBe('danik');
});






