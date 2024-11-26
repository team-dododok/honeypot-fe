import Info from '@/components/Info/Info';
import { useMemberInfo } from '@/hooks/user/useMemberInfo';
import { theme } from '@/styles/theme';
import styled from '@emotion/styled';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { data: member } = useMemberInfo();

  return (
    <Container>
      <ProfileContainer>
        <ProfileBox>
          <ProfileImg src="/assets/images/profile/profile.svg" alt="profile" />
          <ProfileEdit
            src="/assets/icons/profile-edit.svg"
            alt="profileedit"
            onClick={() => {
              navigate('update');
            }}
          />
        </ProfileBox>
        {member && (
          <ProfileInfo>
            <h1>{member.name}</h1>
            <p>{member.email}</p>
          </ProfileInfo>
        )}
      </ProfileContainer>

      <ProfileDesc>
        <Section>
          <Label>받은 꿀</Label>
          <Value>{member ? member.receivedPraiseCount : 0}</Value>
        </Section>
        <Divider />
        <Section>
          <Label>보낸 꿀</Label>
          <Value>{member ? member.sendPraiseCount : 0}</Value>
        </Section>
        <Divider />
        <Section>
          <Label>Best 꿀도장</Label>
          <Icon>
            <Info>
              {member && member.bestStamp
                ? `${member.bestStamp} 꿀도장을 가장 많이 받았습니다.`
                : '아직 베스트 꿀도장이 없습니다.'}
            </Info>
          </Icon>
        </Section>
      </ProfileDesc>
    </Container>
  );
};

export default Profile;

const Container = styled.div`
  width: 100%;
  padding: 36px 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 28px;

  border-radius: 16px;
  background: ${theme.colors.gray0};
  box-shadow: 0px 0px 8px 0px rgba(201, 201, 201, 0.25);
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`;

const ProfileBox = styled.div`
  position: relative;
`;

const ProfileImg = styled.img`
  width: 120px;
  height: 120px;
`;

const ProfileEdit = styled.img`
  position: absolute;
  bottom: 0;
  right: -5px;
  width: 28px;
  height: 28px;
  cursor: pointer;
`;

const ProfileInfo = styled.div`
  text-align: center;
  h1 {
    ${theme.typography.heading2};
    color: ${theme.colors.gray80};
  }
  p {
    ${theme.typography.detail4};
    color: ${theme.colors.gray60};
  }
`;

const ProfileDesc = styled.div`
  display: flex;
  height: 80px;
  padding: 9px 22px;
  justify-content: space-around;
  align-items: center;
  gap: 11px;
  align-self: stretch;

  border-radius: 24px;
  border: 1px solid ${theme.colors.gray10};
  background: ${theme.colors.gray0};
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 0 12px;
  gap: 4px;
  position: relative;
`;

const Label = styled.p`
  ${theme.typography.body5};
  color: ${theme.colors.gray60};
  white-space: nowrap;
`;

const Value = styled.p`
  ${theme.typography.subtitle1};
  color: ${theme.colors.gray80};
  height: 30px;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  position: relative;
  cursor: pointer;

  img {
    width: 16px;
    height: 16px;
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #ddd;
`;
