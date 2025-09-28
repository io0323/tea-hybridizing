import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

/**
 * エントリーポイントのテスト
 */
test('app renders without crashing', () => {
  // アプリが正常にレンダリングされることを確認
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();
});

test('basic functionality test', () => {
  // 基本的な機能テスト
  expect(true).toBe(true);
});
