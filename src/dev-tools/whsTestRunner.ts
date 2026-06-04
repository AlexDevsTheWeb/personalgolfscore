#!/usr/bin/env node

/**
 * WHS (World Handicap System) test runner.
 *
 * CLI test runner specifically for WHS Score Differential and Handicap Index
 * calculations. Follows the pattern established by testRunner.ts.
 *
 * Usage:
 *   npm run test:calc:whs        # Run all WHS test cases
 *   npm run test:calc:whs-quick  # Run a representative subset
 *
 * [CITED: CONTEXT.md — WHS test strategy]
 */

import {
	WHSScoreDifferentialTestCases,
	WHSHandicapIndexTestCases,
	WHSProjectedHITestCases,
	WHSPlayingHCPTestCases,
} from './whsTestData';

// NOTE: Relative imports used because `tsx` does not resolve `@/` path aliases.
// The implementation files do not exist yet — this is expected for the TDD RED phase.
// They will be created in Task 2 (GREEN phase).
import { calculateScoreDifferential, calculatePlayingHandicap } from '../utils/whs/whs.utils';
import { calculateHandicapIndex, calculateProjectedHandicapIndex } from '../utils/whs/hi.utils';

const TOLERANCE = 0.1;
const PASS_SYMBOL = '✅';
const FAIL_SYMBOL = '❌';

interface TestResult {
	name: string;
	passed: boolean;
	expected: unknown;
	actual: unknown;
	error?: string;
}

/**
 * Run all Score Differential test cases.
 */
function runSDTests(): TestResult[] {
	return WHSScoreDifferentialTestCases.map((tc) => {
		try {
			const result = calculateScoreDifferential(tc.input);
			const agsPassed = Math.abs(result.adjustedGrossScore - tc.expectedAGS) <= TOLERANCE;
			const sdPassed = Math.abs(result.scoreDifferential - tc.expectedSD) <= TOLERANCE;
			const passed = agsPassed && sdPassed;

			return {
				name: `SD: ${tc.name}`,
				passed,
				expected: `AGS=${tc.expectedAGS}, SD=${tc.expectedSD}`,
				actual: `AGS=${result.adjustedGrossScore}, SD=${result.scoreDifferential}`,
			};
		} catch (err: any) {
			return {
				name: `SD: ${tc.name}`,
				passed: false,
				expected: `AGS=${tc.expectedAGS}, SD=${tc.expectedSD}`,
				actual: 'ERROR',
				error: err.message ?? String(err),
			};
		}
	});
}

/**
 * Run all Handicap Index test cases.
 */
function runHITests(): TestResult[] {
	return WHSHandicapIndexTestCases.map((tc) => {
		try {
			const result = calculateHandicapIndex(tc.scoreDifferentials);
			const passed =
				tc.expectedHI === null
					? result === null
					: result !== null && Math.abs(result - tc.expectedHI) <= TOLERANCE;

			return {
				name: `HI: ${tc.name}`,
				passed,
				expected: tc.expectedHI,
				actual: result,
			};
		} catch (err: any) {
			return {
				name: `HI: ${tc.name}`,
				passed: false,
				expected: tc.expectedHI,
				actual: 'ERROR',
				error: err.message ?? String(err),
			};
		}
	});
}

/**
 * Run all Projected Handicap Index test cases.
 */
function runProjectedHITests(): TestResult[] {
	return WHSProjectedHITestCases.map((tc) => {
		try {
			const result = calculateProjectedHandicapIndex(tc.currentSDs, tc.simulatedSD);
			const passed =
				tc.expectedHI === null
					? result === null
					: result !== null && Math.abs(result - tc.expectedHI) <= TOLERANCE;

			return {
				name: `Projected HI: ${tc.name}`,
				passed,
				expected: tc.expectedHI,
				actual: result,
			};
		} catch (err: any) {
			return {
				name: `Projected HI: ${tc.name}`,
				passed: false,
				expected: tc.expectedHI,
				actual: 'ERROR',
				error: err.message ?? String(err),
			};
		}
	});
}

/**
 * Run all Playing Handicap test cases.
 */
function runPlayingHCPTests(): TestResult[] {
	return WHSPlayingHCPTestCases.map((tc) => {
		try {
			const result = calculatePlayingHandicap(
				tc.handicapIndex,
				tc.courseRating,
				tc.slopeRating,
				tc.par,
			);
			const passed = result === tc.expectedPlayingHCP;

			return {
				name: `Playing HCP: ${tc.name}`,
				passed,
				expected: tc.expectedPlayingHCP,
				actual: result,
			};
		} catch (err: any) {
			return {
				name: `Playing HCP: ${tc.name}`,
				passed: false,
				expected: tc.expectedPlayingHCP,
				actual: 'ERROR',
				error: err.message ?? String(err),
			};
		}
	});
}

/**
 * Log a single test result to the console.
 */
function logResult(result: TestResult): void {
	if (result.passed) {
		console.log(`${PASS_SYMBOL} ${result.name}`);
	} else {
		console.log(`${FAIL_SYMBOL} ${result.name}`);
		console.log(`   Expected: ${JSON.stringify(result.expected)}`);
		console.log(`   Actual:   ${JSON.stringify(result.actual)}`);
		if (result.error) {
			console.log(`   Error:    ${result.error}`);
		}
	}
}

/**
 * Run a set of tests and return summary stats.
 */
function runTestSuite(
	name: string,
	results: TestResult[],
): { total: number; passed: number } {
	console.log(`\n--- ${name} ---\n`);
	let passedCount = 0;
	for (const r of results) {
		logResult(r);
		if (r.passed) passedCount++;
	}
	const total = results.length;
	console.log(`\n${passedCount}/${total} passed`);
	return { total, passed: passedCount };
}

export class WHSTestRunner {
	/**
	 * Run all WHS test cases (full suite).
	 */
	static runAll(): void {
		console.log('🏌️  WHS Calculation Test Suite\n');
		console.log('=== Full Suite ===');

		const sdResults = runSDTests();
		const hiResults = runHITests();
		const projectedResults = runProjectedHITests();
		const playingHCPResults = runPlayingHCPTests();

		const sd = runTestSuite('Score Differential (WHS Rule 5.1)', sdResults);
		const hi = runTestSuite('Handicap Index (WHS Rule 5.2a)', hiResults);
		const proj = runTestSuite('Projected Handicap Index', projectedResults);
		const phcp = runTestSuite('Playing Handicap (D-09)', playingHCPResults);

		const total = sd.total + hi.total + proj.total + phcp.total;
		const passed = sd.passed + hi.passed + proj.passed + phcp.passed;
		const allPassed = total === passed;

		console.log('\n=== Summary ===');
		console.log(`SD:                  ${sd.passed}/${sd.total}`);
		console.log(`HI:                  ${hi.passed}/${hi.total}`);
		console.log(`Projected HI:        ${proj.passed}/${proj.total}`);
		console.log(`Playing HCP:         ${phcp.passed}/${phcp.total}`);
		console.log(`\nTotal: ${passed}/${total}`);

		if (allPassed) {
			console.log(`\n🎉 All WHS tests passed!\n`);
		} else {
			console.log(`\n🚨 ${total - passed} test(s) FAILED\n`);
		}

		// Exit with non-zero code on failure for CI/script usage
		if (!allPassed) {
			process.exit(1);
		}
	}

	/**
	 * Run a representative subset of WHS tests (quick mode).
	 */
	static runQuick(): void {
		console.log('🏌️  WHS Quick Test\n');

		// Representative subset: 2 SD, 2 HI, 1 projected, 1 playing HCP
		const sdQuick = runSDTests().slice(0, 2);
		const hiQuick = runHITests().slice(0, 2);
		const projectedQuick = runProjectedHITests().slice(0, 1);
		const playingHCPQuick = runPlayingHCPTests().slice(0, 1);

		const sd = runTestSuite('Score Differential (quick)', sdQuick);
		const hi = runTestSuite('Handicap Index (quick)', hiQuick);
		const proj = runTestSuite('Projected HI (quick)', projectedQuick);
		const phcp = runTestSuite('Playing HCP (quick)', playingHCPQuick);

		const total = sd.total + hi.total + proj.total + phcp.total;
		const passed = sd.passed + hi.passed + proj.passed + phcp.passed;
		const allPassed = total === passed;

		console.log(`\nQuick test: ${passed}/${total} passed`);

		if (!allPassed) {
			process.exit(1);
		}
	}
}

// CLI entry point
const args = process.argv.slice(2);
const mode = args[0] || 'quick';

if (mode === 'all') {
	WHSTestRunner.runAll();
} else {
	WHSTestRunner.runQuick();
}
