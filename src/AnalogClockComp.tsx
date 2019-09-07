import React from 'react'
import styles from './AnalogClockComp.module.css'

export interface AnalogClockCompProps {
	_hour: number
	_minute: number
}

export function AnalogClockComp({
	_hour: hour,
	_minute: minute,
}: AnalogClockCompProps) {
	const minuteRatio = (minute % 60) / 60
	const minuteAngle = 360 * minuteRatio
	const hourRatio = ((hour % 12) + minuteRatio) / 12
	const hourAngle = 360 * hourRatio
	return (
		<>
			<svg viewBox='0 0 100 100' className={styles.clock}>
				<circle
					cx={50}
					cy={50}
					r={49.5}
					strokeWidth={1}
					stroke='black'
					fill='white'
				/>
				<path
					d='m 0,0 l 0,-40'
					strokeWidth={5}
					stroke='black'
					strokeLinecap='round'
					transform={`translate(50 50) rotate(${minuteAngle})`}
					fill='black'
				/>
				<path
					d='m 0,0 l 0,-30'
					strokeWidth={5}
					stroke='black'
					strokeLinecap='round'
					transform={`translate(50 50) rotate(${hourAngle})`}
					fill='black'
				/>
				{Array.from(new Array(60).keys()).map(index => (
					<path
						key={index}
						d={`m 0,-49.5 l 0,${index % 5 ? 3 : 5}`}
						strokeWidth={index % 5 ? 1 : 3}
						stroke='black'
						fill='white'
						transform={`translate(50 50) rotate(${index * 6})`}
					/>
				))}
			</svg>
		</>
	)
}
