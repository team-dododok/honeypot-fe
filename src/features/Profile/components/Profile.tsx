import Info from '@/components/Info/Info';
import { marginFadeIn, marginFadeOut } from '@/styles/Animation';
import { theme } from '@/styles/theme';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BEST_STAMP_COMMENT,
  BEST_STAMP_COMMENT_DETAIL,
} from '../constants/profile';
import { useMemberInfo } from '@/hooks/user/useMemberInfo';

const Profile = () => {
  const navigate = useNavigate();
  const { data: member } = useMemberInfo();
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleToggleTooltip = () => {
    setShowTooltip((prev) => !prev);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      tooltipRef.current &&
      !tooltipRef.current.contains(event.target as Node)
    ) {
      setShowTooltip(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <ProfileContainer>
        <ProfileBox>
          <ProfileImg src={member && member.imageUrl} alt="profile" />
          <ProfileEdit
            src="/assets/icons/profile-edit.svg"
            alt="profile_edit"
            onClick={() => {
              navigate('/profile/update');
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
          <Value>{member ? member.receivePraiseCount : 0}</Value>
        </Section>
        <Divider />
        <Section>
          <Label>보낸 꿀</Label>
          <Value>{member ? member.sendPraiseCount : 0}</Value>
        </Section>
        <Divider />
        <Section>
          <Label>Best 꿀도장</Label>
          <Icon ref={tooltipRef}>
            {member && member.bestStamp ? (
              <img
                className="bestStamp"
                src={`${member.bestStamp}`}
                alt="bestStamp"
                onClick={handleToggleTooltip}
              />
            ) : (
              <Info className="infoImg">
                {BEST_STAMP_COMMENT.map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    {index < BEST_STAMP_COMMENT.length - 1 && <br />}
                  </Fragment>
                ))}
              </Info>
            )}
            {showTooltip && (
              <Tooltip $visible={showTooltip}>
                {BEST_STAMP_COMMENT_DETAIL.map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    {index < BEST_STAMP_COMMENT_DETAIL.length - 1 && <br />}
                  </Fragment>
                ))}
              </Tooltip>
            )}
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

  .bestStamp {
    width: 40px;
    height: 40px;
  }

  .infoImg {
    width: 16px;
    height: 16px;
  }
`;

const Tooltip = styled.div<{ $visible: boolean }>`
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  padding: 8px 12px;
  border-radius: 8px;
  background: ${theme.colors.gray80};
  color: ${theme.colors.gray00};
  ${theme.typography.detail5};
  text-align: left;
  z-index: 10;
  white-space: nowrap;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.2);
  animation: ${(props) =>
    props.$visible
      ? css`
          ${marginFadeIn} 0.3s ease-in-out forwards
        `
      : css`
          ${marginFadeOut} 0.3s ease-in-out forwards
        `};

  &::before {
    content: '';
    position: absolute;
    top: -5.5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 6px solid ${theme.colors.gray80};
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #ddd;
`;
