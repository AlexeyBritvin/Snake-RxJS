import { fromEvent } from 'rxjs';
import { Point2D, Key } from './models';
import { map, filter, scan, startWith, distinctUntilChanged } from 'rxjs/operators';
import { DIRECTIONS } from './constants';

const INITIAL_DIRECTION: Point2D = DIRECTIONS[Key.RIGHT];

export function nextDirection(previous, next) {
  const isOpposite = (previous: Point2D, next: Point2D) => {
    return next.x === previous.x * -1 || next.y === previous.y * -1;
  };

  if (isOpposite(previous, next)) {
    return previous;
  }

  return next;
}

const keydown$ = fromEvent(document, 'keydown');

export const direction$ = keydown$.pipe(
  map((event: KeyboardEvent) => DIRECTIONS[event.keyCode]),
  filter(direction => !!direction),
  scan(nextDirection),
  startWith(INITIAL_DIRECTION),
  distinctUntilChanged()
);
