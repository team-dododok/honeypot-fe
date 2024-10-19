import Button from '@/components/Button/Button';
import React from 'react';

const MainPage = () => {
  return (
    <div>
      MainPage
      <Button text="Normal" />
      <Button text="Default" variant="default" />
      <Button text="Deactivate" variant="deactivate" />
      <Button text="Activate" variant="activate" />
      <Button text="Danger" variant="danger" />
      <Button text="Warning" variant="warning" />
    </div>
  );
};

export default MainPage;
