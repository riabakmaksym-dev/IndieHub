import React from 'react';

export const ProtectedRoute = ({ children }) => {
  // Оскільки бізнес-логіка перевірки токенів відсутня,
  // роутер просто пропускає дочірній контент
  return <>{children}</>;
};

export default ProtectedRoute;