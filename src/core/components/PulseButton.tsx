import { Button, ButtonProps, styled } from '@mui/material';

interface PulseButtonProps extends ButtonProps {
  pulse?: boolean;
  children: React.ReactNode;
}

const PulseButton: React.FC<PulseButtonProps> = ({
  pulse,
  children,
  ...props
}) => {
  return (
    <StyledButton className={pulse ? 'pulse' : ''} {...props}>
      {children}
    </StyledButton>
  );
};

export default PulseButton;

const StyledButton = styled(Button)`
  &.pulse {
    animation: buttonScale 1s infinite alternate;
    overflow: hidden;

    @keyframes buttonScale {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }

    &:after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: inherit;
      border-radius: inherit;
      transform: translate(-50%, -50%);
      pointer-events: none;
      opacity: 0;
      animation: rippleEffect 1s infinite;
    }

    @keyframes rippleEffect {
      0% {
        opacity: 1;
        transform: scale(0.8);
      }
      50% {
        opacity: 0.5;
      }
      100% {
        opacity: 0;
        transform: scale(1.5);
      }
    }
  }
`;
