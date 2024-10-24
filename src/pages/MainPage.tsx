import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import React, { useState } from 'react';

const MainPage = () => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div>
      MainPage
      <h1>Guide</h1>
      <Button text="Normal" />
      <Button
        text="Normal Icon"
        icon={<img src="/assets/icons/download.svg" alt="Download" />}
      />
      <Button text="Default" variant="default" />
      <Button text="Deactivate" variant="deactivate" />
      <Button text="Activate" variant="activate" />
      <Button text="Danger" variant="danger" />
      <Button text="Warning" variant="warning" />
      <Input
        width="100%"
        placeholder="Input"
        clear={false}
        value={inputValue}
        onChange={handleChange}
      />
      <Input
        width="100%"
        placeholder="Clear Input"
        clear={true}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default MainPage;
