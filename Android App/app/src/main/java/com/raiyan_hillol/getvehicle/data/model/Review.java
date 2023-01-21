package com.raiyan_hillol.getvehicle.data.model;

import org.json.JSONObject;

public class Review {
    private String id;
    private int star;
    private String comment;

    private String postedDate;
    private JSONObject postedBy =  new JSONObject();;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getStar() {
        return star;
    }

    public void setStar(int star) {
        this.star = star;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public JSONObject getPostedBy() {
        return postedBy;
    }

    public void setPostedBy(JSONObject postedBy) {
        this.postedBy = postedBy;
    }

    public String getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(String postedDate) {
        this.postedDate = postedDate;
    }
}
