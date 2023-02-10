import styled, { createGlobalStyle, keyframes } from 'styled-components';
const skChase = keyframes`
	100% {
		transform: rotate(360deg);
	}
`;
const skChaseDot = keyframes`
	80%,
	100% {
		transform: rotate(360deg);
	}
`;
const StyledElement = styled.div`
	align-items: center;
	backdrop-filter: blur(3px);
	background: rgba(0, 0, 0, 0.4);
	display: flex;
	height: 100vh;
	justify-content: center;
	left: 0;
	position: fixed;
	top: 0;
	width: 100%;
	z-index: 9999999;
	& .sk-chase {
		animation: ${skChase} 2.5s infinite linear both;
		height: 60px;
		position: relative;
		width: 60px;
		& .sk-chase-dot {
			animation: ${skChaseDot} 2s infinite ease-in-out both;
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			&:nth-child(1) {
				animation-delay: -1.1s;
			}
			&:nth-child(2) {
				animation-delay: -1s;
			}
			&:nth-child(3) {
				animation-delay: -0.9s;
			}
			&:nth-child(4) {
				animation-delay: -0.8s;
			}
			&:nth-child(5) {
				animation-delay: -0.7s;
			}
			&:nth-child(6) {
				animation-delay: -0.6s;
			}
			&:before {
				background-color: #fff;
				border-radius: 5px;
				content: '';
				display: block;
				height: 10px;
				width: 10px;
			}
		}
	}
`;
const Styles = createGlobalStyle`
	body {
		overflow: hidden !important;
	}
`;
const Loading = () => (
	<StyledElement>
		<div className='sk-chase'>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
			<div className='sk-chase-dot'></div>
		</div>
		<Styles />
	</StyledElement>
);
export default Loading;