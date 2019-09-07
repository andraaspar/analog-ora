import React, { useRef, useState } from 'react'
import { AnalogClockComp } from './AnalogClockComp'
import styles from './AppComp.module.css'

export function AppComp() {
	const [$number, set$number] = useState(1)
	const [$hour, set$hour] = useState(pickHour)
	const [$minute, set$minute] = useState(pickMinute)
	const [$timeOfDay, set$timeOfDay] = useState(getTimeOfDay($hour, $minute))
	const [$hourGiven, set$hourGiven] = useState('')
	const [$minuteGiven, set$minuteGiven] = useState('')
	const focusableRef = useRef<HTMLInputElement>(null)

	function pickHour() {
		return Math.floor(Math.random() * 24)
	}

	function pickMinute() {
		return Math.floor(Math.random() * 60)
	}

	function onSubmit(e: React.FormEvent) {
		e.preventDefault()
		const hourGiven = parseInt($hourGiven, 10)
		const minuteGiven = parseInt($minuteGiven, 10)
		if (hourGiven === $hour && minuteGiven === $minute) {
			alert(`Helyes!`)
			set$number($number + 1)
			const hour = pickHour()
			const minute = pickMinute()
			set$hour(hour)
			set$minute(minute)
			set$timeOfDay(getTimeOfDay(hour, minute))
		} else {
			alert(`Helytelen.`)
		}
		set$hourGiven('')
		set$minuteGiven('')
		focusableRef.current!.focus()
	}

	function getTimeOfDay(hour: number, minute: number) {
		if (hour < 1 && minute < 8) {
			return 'éjfél'
		} else if (hour < 6) {
			return 'hajnali'
		} else if (hour < 9) {
			return 'reggel'
		} else if (hour < 11 || (hour === 11 && minute < 60 - 7)) {
			return 'délelőtt'
		} else if (hour < 12 || (hour === 12 && minute < 8)) {
			return 'dél'
		} else if (hour < 18) {
			return 'délután'
		} else if (hour < 22) {
			return 'este'
		} else if (hour < 23 || (hour === 23 && minute < 60 - 7)) {
			return 'éjjel'
		} else {
			return 'éjfél'
		}
	}

	return (
		<div className={styles.app}>
			<div>
				{$number}. <b>{$timeOfDay}</b>
			</div>
			<AnalogClockComp _hour={$hour} _minute={$minute} />
			<form onSubmit={onSubmit}>
				<input
					ref={focusableRef}
					type='number'
					min={0}
					max={23}
					step={1}
					value={$hourGiven}
					onChange={e => {
						set$hourGiven(e.target.value)
					}}
				/>
				{' : '}
				<input
					type='number'
					min={0}
					max={59}
					step={1}
					value={$minuteGiven}
					onChange={e => {
						set$minuteGiven(e.target.value)
					}}
				/>{' '}
				<button>Oké</button>
			</form>
		</div>
	)
}
