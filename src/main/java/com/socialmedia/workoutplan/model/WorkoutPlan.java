package com.socialmedia.workoutplan.model;

public class WorkoutPlan {
    private String Id;
    private String routines;
    private String exercise;
    private String sets;
    private String repetitions;

    public WorkoutPlan() {
    }

    public WorkoutPlan(String id, String routines, String exercise, String sets, String repetitions) {
        Id = id;
        this.routines = routines;
        this.exercise = exercise;
        this.sets = sets;
        this.repetitions = repetitions;
    }

    public String getId() {
        return Id;
    }

    public void setId(String id) {
        Id = id;
    }

    public String getRoutines() {
        return routines;
    }

    public void setRoutines(String routines) {
        this.routines = routines;
    }

    public String getExercise() {
        return exercise;
    }

    public void setExercise(String exercise) {
        this.exercise = exercise;
    }

    public String getSets() {
        return sets;
    }

    public void setSets(String sets) {
        this.sets = sets;
    }

    public String getRepetitions() {
        return repetitions;
    }

    public void setRepetitions(String repetitions) {
        this.repetitions = repetitions;
    }
}
