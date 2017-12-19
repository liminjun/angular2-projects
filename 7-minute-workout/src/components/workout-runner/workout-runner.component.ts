import { WorkoutPlan, ExercisePlan, Exercise } from './model'
import { Component, OnInit } from '@angular/core';
import {ExerciseDescriptionComponent} from './exercise-description/exercise-description.component'; 

@Component({
    selector: 'workout-runner',
    templateUrl: '/src/components/workout-runner/workout-runner.html' 
})

export class WorkoutRunnerComponent implements OnInit {
    workoutPlan: WorkoutPlan;
    restExercise: ExercisePlan;
    constructor() {
        this.workoutPlan = this.buildWorkout();
        this.restExercise = new ExercisePlan(
            new Exercise("rest", "Relax!", "Relax a bit", "rest.png"),
            this.workoutPlan.restBetweenExercise);
    }
    ngOnInit() {
        this.start();
    }
    buildWorkout(): WorkoutPlan {
        let workout = new WorkoutPlan("7MinWorkout",
            "7 Minute Workout", 10, []);
        workout.exercises.push(
            new ExercisePlan(
                new Exercise(
                    "jumpingJacks",
                    "Jumping Jacks",
                    "A jumping jack or star jump, also called side-straddle hope is a physical jumping exercise.",
                    "JumpingJacks.png",
                    "jumpingjacks.wav",
                    `Assume an erect position, with feet together and arms at your side. <br> 
                    Slightly bend your knees, and propel yourself a few inches into the air. <br> 
                    While in air, bring your legs out to the side about shoulder width or slightly wider. <br> `,
                    ["dmYwZH_BNd0", "BABOdJ-2Z6o", "c4DAnQ6DtF8"]),
                30));
        // (TRUNCATED) Other 11 workout exercise data. 
        return workout;
    }
    workoutTimeRemaining: number;
    currentExerciseIndex: number;
    start() {
        this.workoutTimeRemaining = this.workoutPlan.totalWorkoutDuration();
        this.currentExerciseIndex = 0;
        this.startExercise(this.workoutPlan.exercises[this.currentExerciseIndex]);
    }
    currentExercise: ExercisePlan;
    exerciseRunningDuration: number;

    getNextExercise(): ExercisePlan {
        let nextExercise: ExercisePlan = null;
        if (this.currentExercise === this.restExercise) {
            nextExercise =
                this.workoutPlan.exercises[this.currentExerciseIndex + 1];
        }
        else if (this.currentExerciseIndex <
            this.workoutPlan.exercises.length - 1) {
            nextExercise = this.restExercise;
        }
        return nextExercise;
    }


    startExercise(exercisePlan: ExercisePlan) {
        this.currentExercise = exercisePlan;
        this.exerciseRunningDuration = 0;
        let intervalId = setInterval(() => {
            if (this.exerciseRunningDuration >=
                this.currentExercise.duration) {
                clearInterval(intervalId);
                let next: ExercisePlan = this.getNextExercise();

                if (next) {

                    if (next !== this.restExercise) {

                        this.currentExerciseIndex++;

                    }

                    this.startExercise(next);
                }

                else { console.log("Workout complete!"); }
            }
        }, 1000);
    }


} 
