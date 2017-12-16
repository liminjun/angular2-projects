export class Exercise {
    constructor(
        public name: string,
        public title: string,
        public description: string,
        public image: string,
        public nameSound?: string,//?可选参数
        public procedure?: string,
        public videos?: Array<string>) { }
}

export class WorkoutPlan {
    constructor(
        public name: string,
        public title: string,
        public restBetweenExercise: number,
        public exercises: ExercisePlan[],
        public description?: string
    ) { }

    totalWorkoutDuration(): number {
        return 11;
    }
}

export class ExercisePlan {
    constructor(
        public exercise: Exercise,
        public duration: number
    ) { }
}