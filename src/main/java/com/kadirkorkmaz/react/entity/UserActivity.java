package com.kadirkorkmaz.react.entity;

import java.sql.Timestamp;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class UserActivity {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    private String activityName;

    private Timestamp activityTime;

    public UserActivity(String activityName, Timestamp activityTime) {
        this.activityName = activityName;
        this.activityTime = activityTime;
    }

}
